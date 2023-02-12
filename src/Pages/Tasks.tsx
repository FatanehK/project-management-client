import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { TasksTable } from "../components/TasksTable";
import { useQuery } from "../services/requestHandlers";
import { ITask } from "../types";

export const Tasks: React.FC = () => {
  const queries = useQuery();
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const usertask = await queries.GetUsertasks();
        if (usertask) setTasks(usertask);
      } catch (error) {}
    };
    loadTasks();
  }, [queries]);

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
      <TasksTable tasks={tasks} showLable={false} />
    </Box>
  );
};
