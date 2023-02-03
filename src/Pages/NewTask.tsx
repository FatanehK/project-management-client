import { Alert, Box, Button, Snackbar, TextField, Typography } from "@mui/material"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { RoutePaths } from "../contants"
import { CreateTask } from "../services/requestHandlers"
import { ITask } from "../types"

export const NewTask: React.FC = () =>{
    const navigate = useNavigate()

    const [task,setTask]= useState<Partial<ITask>>({title: "",
    description: ""});


    const [alert, setAlert] = useState<{
    open: boolean;
    severity: "success" | "error";
  }>({
    open: false,
    severity: "error",
  });

    const handleTitleChange = (
        event: ChangeEvent<HTMLTextAreaElement| HTMLInputElement>) =>{
            const title = event.currentTarget.value;
            setTask({...task, title})
        };
    const handleDecriptionChange = (
        event:ChangeEvent<HTMLTextAreaElement|HTMLInputElement>)=>{
            const description = event.currentTarget.value;
            setTask({...task,description});
        }
    const onCreate = async()=>{
        try{
            await CreateTask(task);
            setAlert({
            open: true,
            severity: "success",
      });
      setTimeout(()=>{
        navigate(RoutePaths.tasks);
      },1000);
    } catch(error){
        setAlert({
            open: true,
            severity: "error",
        });
    }
    };
    const handleCloseAlert = () =>{
        setAlert({open:false, severity: alert.severity })
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
            ? "Task information saved successfully!"
            : "There was an error in saving the task information."}
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
}