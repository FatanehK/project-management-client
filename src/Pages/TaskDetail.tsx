
import { Box, Snackbar, Alert, TextField, Button } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { GetTask, SaveTask } from "../services/requestHandlers";
import { ITask } from "../types";

export const TaskDetail: React.FC =()=>{
  const {taskId} = useParams();
  const [editedtask, setEditTask] = useState<Partial<ITask>> ({title: "",
  description: ""});

  const [alert, setAlert] = useState<{
    open: boolean;
    severity: "success" | "error";
    }>({
      open: false,
      severity: "error",
    });



  useEffect(() => {
    const loadTask = async () => {
      if (taskId){
      const tsk = await GetTask(taskId);
      if (tsk) {
          setEditTask(tsk);
      }
    };
  }
    loadTask();
  }, [taskId]);

  const handleOnTaskTitleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const title = event.currentTarget.value;
    setEditTask({ ...editedtask, title });
  };

  const handleOnTaskDescriptionChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const description = event.currentTarget.value;
    setEditTask({ ...editedtask, description });
  };
  const handleOnTaskStatusChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const status = event.currentTarget.value;
    setEditTask({ ...editedtask, status });
  };
  const handleOnTaskDuedateChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const due_date = event.currentTarget.value;
    setEditTask({ ...editedtask, due_date });
  };
  const onSave = async () =>{
      try {
          await SaveTask(editedtask); 
          setAlert({
            open: true,
            severity: "success",
          });
      }
      catch(error){setAlert({
        open: true,
        severity: "error",
      });}

  }
  const handleCloseAlert =()=>{
    setAlert({open:false, severity:alert.severity})
  }
  return (
    <Box
      sx={{
        flex: "0 1 auto",
        alignSelf: "stretch",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 5,
        width: "100%",
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
      <Box>
        <TextField
          label="Title"
          variant="outlined"
          value={editedtask.title}
          onChange={handleOnTaskTitleChange}
        />
        <TextField
          label="Description"
          variant="outlined"
          value={editedtask.description}
          onChange={handleOnTaskDescriptionChange}
        />
        <TextField
          label="Status"
          variant="outlined"
          value={editedtask.status}
          onChange={handleOnTaskStatusChange}
        />
        <TextField
          label="Duedate"
          variant="outlined"
          value={editedtask.due_date}
          onChange={handleOnTaskDuedateChange}
        />

        <Button
          variant="contained"
          sx={{ width: 100, alignSelf: "end" }}
          onClick={onSave}
        >
          Save
        </Button>
      </Box>
    </Box>
  );

}

