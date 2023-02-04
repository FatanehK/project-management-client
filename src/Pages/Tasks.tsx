import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { TasksTable } from "../components/TasksTable";
import { GetUsertasks } from "../services/requestHandlers";
import { ITask } from "../types";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../contants";

export const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const usertask = await GetUsertasks(5);
        if (usertask) setTasks(usertask);
      } catch (error) {}
    };
    loadTasks();
  }, []);
  const onNewTask = () => {
    navigate(RoutePaths.NewTask);
  };

  return (
    <Box
      sx={{
        flex: "0 1 auto",
        alignSelf: "stretch",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 1,
        width: "100%",
      }}
    >
      <Button
        onClick={onNewTask}
        sx={{ alignSelf: "start", p: 2 }}
        startIcon={<AddIcon />}
      >
        New Task
      </Button>
      <TasksTable tasks={tasks} showLable={false} />
    </Box>
  );
};
