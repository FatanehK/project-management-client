import { Box } from "@mui/material";
import { ITask } from "../types";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export interface ITasksTableProps {
  tasks: ITask[];
}

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Id",
    width: 50,
  },
  {
    field: "title",
    headerName: "Title",
    width: 150,
  },
  {
    field: "description",
    headerName: "Description",
    width: 150,
  },
  {
    field: "dueDate",
    headerName: "Due Date",
    width: 110,
  },
  {
    field: "status",
    headerName: "Status",
    width: 80,
  },
  {
    field: "assignedTo",
    headerName: "Assigned To",
    width: 110,
  },
];

export const TasksTable: React.FC<ITasksTableProps> = (props) => {
  const { tasks } = props;
  const rows = tasks.map((task) => {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      dueDate: task.due_date,
      status: task.status,
      assignedTo: task.assigned_to?.full_name,
    };
  });

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <DataGrid columns={columns} rows={rows} />
    </Box>
  );
};
