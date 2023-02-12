import { Box, Snackbar, Alert, TextField, Button } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StatusSelector } from "../components/StatusSelector";
import { useQuery } from "../services/requestHandlers";
import { ITask, StatusType } from "../types";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

export const TaskDetail: React.FC = () => {
  const queries = useQuery();
  const { taskId } = useParams();
  const [task, setTask] = useState<Partial<ITask>>({
    title: "",
    description: "",
    status: "New",
    due_date: "",
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
        const tsk = await queries.GetTask(taskId);
        if (tsk) {
          setTask(tsk);
        }
      }
    };

    loadTask();
  }, [taskId, queries]);

  const onTitleChanged = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const title = event.currentTarget.value;
    setTask({ ...task, title });
  };

  const onDescriptionChanged = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const description = event.currentTarget.value;
    setTask({ ...task, description });
  };

  const onStatusChanged = (newStatus: StatusType) => {
    setTask({ ...task, status: newStatus });
  };

  const onDueDateChanged = (newValue: Dayjs | null) => {
    if (newValue) {
      setTask({ ...task, due_date: newValue.toString() });
    }
  };

  const onSave = async () => {
    try {
      await queries.SaveTask(task);
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
        "& .MuiTextField-root": { mt: 1, mb: 1, width: "100%" },
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
        onChange={onTitleChanged}
      />
      <TextField
        label="Description"
        multiline
        rows={5}
        variant="outlined"
        value={task.description}
        onChange={onDescriptionChanged}
      />
      <Box sx={{ alignSelf: "start", width: 200 }}>
        <StatusSelector
          onChange={onStatusChanged}
          value={task.status ?? "New"}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker<Dayjs>
            label="Due Date"
            value={dayjs(task.due_date)}
            onChange={onDueDateChanged}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
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
