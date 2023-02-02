import { Box, Snackbar, Alert, TextField, Button } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StatusSelector } from "../components/StatusSelector";
import { Status } from "../contants";
import { GetTask, SaveTask } from "../services/requestHandlers";
import { ITask, StatusType } from "../types";

export const TaskDetail: React.FC = () => {
  const { taskId } = useParams();
  const [task, setEditTask] = useState<Partial<ITask>>({
    title: "",
    description: "",
    status: "New",
  });

  const [alert, setAlert] = useState<{
    open: boolean;
    severity: "success" | "error";
  }>({
    open: false,
    severity: "error",
  });

  useEffect(() => {
    const loadTask = async () => {
      if (taskId) {
        const tsk = await GetTask(taskId);
        if (tsk) {
          setEditTask(tsk);
        }
      }
    };
    loadTask();
  }, [taskId]);

  const handleOnTaskTitleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const title = event.currentTarget.value;
    setEditTask({ ...task, title });
  };

  const handleOnTaskDescriptionChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const description = event.currentTarget.value;
    setEditTask({ ...task, description });
  };
  const handleOnTaskStatusChange = (newStatus: StatusType) => {
    setEditTask({ ...task, status: newStatus });
  };
  // const handleOnTaskDuedateChange = (newStatus: StatusType) => {
  //   const due_date = event.currentTarget.value;
  //   setEditTask({ ...task, due_date });
  // };
  const onSave = async () => {
    try {
      await SaveTask(task);
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
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        flex: "0 1 auto",
        alignSelf: "stretch",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        pl: 5,
        pr: 5,
        pt: 3,
        "& .MuiTextField-root": { m: 1, width: "100%" },
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
      <TextField
        label="Title"
        variant="outlined"
        value={task.title}
        onChange={handleOnTaskTitleChange}
      />
      <TextField
        label="Description"
        multiline
        rows={5}
        variant="outlined"
        value={task.description}
        onChange={handleOnTaskDescriptionChange}
      />
      <Box sx={{ alignSelf: "start" }}>
        <StatusSelector
          onChange={handleOnTaskStatusChange}
          value={task.status ?? "New"}
        />
      </Box>

      <Button
        variant="contained"
        sx={{ width: 100, alignSelf: "end" }}
        onClick={onSave}
      >
        Save
      </Button>
    </Box>
  );
};
