import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { TasksTable } from "../components/TasksTable";
import { GetUsertasks } from "../services/requestHandlers";
import { ITask } from "../types";

export const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const usertask = await GetUsertasks(5);
        if (usertask) setTasks(usertask);
      } catch (error) {}
    };
    loadTasks();
  }, []);

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
      <TasksTable tasks={tasks} />
    </Box>
  );
};
