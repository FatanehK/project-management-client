import {
  Alert,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TasksTable } from "../components/TasksTable";
import { UserList } from "../components/UsersList";
import {
  GetProject,
  GetProjectMember,
  GetProjectTasks,
  SaveProject,
} from "../services/requestHandlers";
import { IProject, ITask, IUser } from "../types";

export const ProjectDetail: React.FC = () => {
  const { projectId } = useParams();

  const [project, setProject] = useState<Partial<IProject>>({
    title: "",
    description: "",
  });
  const [members, setMembers] = useState<IUser[]>([])
  const [tasks, setTasks] = useState<ITask[] | null>(null);
  const [alert, setAlert] = useState<{
    open: boolean;
    severity: "success" | "error";
  }>({
    open: false,
    severity: "error",
  });

  useEffect(() => {
    const loadProject = async () => {
      if (projectId) {
        const prj = await GetProject(projectId);
        if (prj) {
          setProject(prj);
        }
      }
    };
    const loadProjectTasks = async () => {
      if (projectId) {
        const tasksList = await GetProjectTasks(projectId);
        setTasks(tasksList);
      }
    };
    const loadProjectMembers = async () => {
      if (projectId) {
        const memberlist = await GetProjectMember(projectId);
        setMembers(memberlist);
      }
    };
    loadProject();
    loadProjectTasks();
    loadProjectMembers();
  }, [projectId]);

  const handleOnTitleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const title = event.currentTarget.value;
    setProject({ ...project, title });
  };

  const handleOnDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const description = event.currentTarget.value;
    setProject({ ...project, description });
  };

  const onSave = async () => {
    try {
      await SaveProject(project);
      setAlert({
        open: true,
        severity: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        severity: "error",
      });
    }
  };

  const handleCloseAlert = () => {
    setAlert({ open: false, severity: alert.severity });
  };

  return (
    <Box
      sx={{
        flex: "1 1 auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignContent: "stretch",
        alignItems: "flex-start",
      }}
    >
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.severity === "success"
            ? "Project information saved successfully!"
            : "There was an error in saving the project information."}
        </Alert>
      </Snackbar>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          flex: "0 1 auto",
          alignSelf: "stretch",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pl: 5,
          pr: 5,
          pt: 3,
          "& .MuiTextField-root": { m: 1, width: "100%" },
        }}
      >
        <Typography
          gutterBottom
          variant="overline"
          component="div"
          sx={{ alignSelf: "start" }}
        >
          {`Project Id: ${projectId}`}
        </Typography>
        <TextField
          label="Title"
          variant="outlined"
          value={project.title}
          onChange={handleOnTitleChange}
        />
        <TextField
          label="Desciption"
          variant="outlined"
          multiline
          rows={5}
          value={project.description}
          onChange={handleOnDescriptionChange}
        />
        <Button
          variant="contained"
          sx={{ width: 100, alignSelf: "end" }}
          onClick={onSave}
        >
          Save
        </Button>
      </Box>

      {tasks && <TasksTable tasks={tasks} />}
      <UserList users={members ?? []} />
    </Box>
  );
};
