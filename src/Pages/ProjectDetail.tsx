import { Alert, Box, Button, Snackbar, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetProject, SaveProject } from "../services/requestHandlers";
import { IProject } from "../types";

export const ProjectDetail: React.FC = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState<Partial<IProject>>({
    title: "",
    description: "",
  });
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
    loadProject();
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
    <Box>
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 5,
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
      >
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
        <Button variant="contained" sx={{ width: 100 }} onClick={onSave}>
          Save
        </Button>
      </Box>
    </Box>
  );
};
