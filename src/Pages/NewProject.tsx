import {
  Alert,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../services/requestHandlers";
import { IProject } from "../types";
import { RoutePaths } from "../contants";

export const NewProject: React.FC = () => {
  const queries = useQuery();
  const navigate = useNavigate();

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

  const onCreate = async () => {
    try {
      await queries.CreateProject(project);
      setAlert({
        open: true,
        severity: "success",
      });
      setTimeout(() => {
        navigate(RoutePaths.Projects);
      }, 1000);
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
          New Project
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
          onClick={onCreate}
        >
          Create
        </Button>
      </Box>
    </Box>
  );
};
