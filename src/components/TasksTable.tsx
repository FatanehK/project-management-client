import { Box, Typography } from "@mui/material";
import { ITask } from "../types";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridApi, GridReadyEvent } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

export interface ITasksTableProps {
  tasks: ITask[];
}

interface ITaskRow {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  assignedTo: string;
}

const columns: ColDef[] = [
  {
    field: "id",
    headerName: "Id",
    width: 70,
    resizable: false,
  },
  {
    field: "title",
    headerName: "Title",
    width: 200,
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
  {
    field: "description",
    headerName: "Description",
    width: 300,
  },
];

const defaultColDef: ColDef = {
  resizable: true,
};

export const TasksTable: React.FC<ITasksTableProps> = (props) => {
  const { tasks } = props;
  const rows: ITaskRow[] = tasks.map((task) => {
    return {
      id: task.id,
      title: task.title,
      description: task.description ?? "",
      dueDate: task.due_date ?? "",
      status: task.status ?? "",
      assignedTo: task.assigned_to?.full_name ?? "",
    };
  });

  const onGridReady = (params: GridReadyEvent<ITaskRow>) => {
    params.api.sizeColumnsToFit()
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: "1 1 auto",
        alignSelf: "stretch",
        pl: 5,
        pr: 5,
        pd: 5,
      }}
    >
      <Typography
        gutterBottom
        variant="overline"
        component="div"
        sx={{ alignSelf: "start" }}
      >
        Tasks
      </Typography>
      <div
        style={{ flex: "1 1 auto", alignSelf: "stretch" }}
        className="ag-theme-material"
      >
        <AgGridReact<ITaskRow>
          columnDefs={columns}
          rowData={rows}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
        />
      </div>
    </Box>
  );
};
