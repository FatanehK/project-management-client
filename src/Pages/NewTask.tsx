import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MemberDropDown } from "../components/MemberDropDown";
import { StatusSelector } from "../components/StatusSelector";
import { useQuery } from "../services/requestHandlers";
import { ITask, IUser, StatusType } from "../types";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const NewTask: React.FC = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const queries = useQuery();

  const [task, setTask] = useState<Partial<ITask>>({
    title: "",
    description: "",
    project_id: Number(projectId),
  });

  const [alert, setAlert] = useState<{
    open: boolean;
    severity: "success" | "error";
  }>({
    open: false,
    severity: "error",
  });

  const [loading, setLoading] = useState(false);

  const handleTitleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const title = event.currentTarget.value;
    setTask({ ...task, title });
  };
  const handleDecriptionChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const description = event.currentTarget.value;
    setTask({ ...task, description });
  };
  const onAssignToChanged = (newValue: IUser) => {
    setTask({ ...task, assigned_to_id: newValue.id, assigned_to: newValue });
  };
  const onCreate = async () => {
    try {
      if (!projectId) {
        return;
      }
      setLoading(true);
      await queries.CreateTask({ ...task, project_id: Number(projectId) });
      setAlert({
        open: true,
        severity: "success",
      });
      setTimeout(() => {
        navigate(-1);
      }, 300);
    } catch (error) {
      setAlert({
        open: true,
        severity: "error",
      });
    }
    setLoading(false);
  };
  const onStatusChanged = (newStatus: StatusType) => {
    setTask({ ...task, status: newStatus });
  };

  const onDueDateChanged = (newValue: Dayjs | null) => {
    if (newValue) {
      setTask({ ...task, due_date: newValue.toString() });
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
            ? "Task information saved successfully!"
            : "There was an error in saving the task information."}
        </Alert>
      </Snackbar>
      <Typography
        gutterBottom
        variant="overline"
        component="div"
        sx={{ alignSelf: "start" }}
      >
        New Task
      </Typography>
      <TextField
        label="Title"
        variant="outlined"
        value={task.title}
        onChange={handleTitleChange}
      />
      <TextField
        label="Desciption"
        variant="outlined"
        multiline
        rows={5}
        value={task.description}
        onChange={handleDecriptionChange}
      />
      <Box sx={{ alignSelf: "start", width: 200 }}>
        {task.project_id && (
          <MemberDropDown
            projectId={task.project_id}
            currentValue={task.assigned_to}
            onChange={onAssignToChanged}
          />
        )}
        <StatusSelector onChange={onStatusChanged} value={task.status} />
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
        onClick={onCreate}
        endIcon={loading && <CircularProgress size={24} />}
        disabled={loading}
      >
        Create
      </Button>
    </Box>
  );
};
