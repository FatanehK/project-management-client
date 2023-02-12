import { Box, IconButton, Typography } from "@mui/material";
import { ITask } from "../types";
import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  GridReadyEvent,
  RowDoubleClickedEvent,
} from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

export interface ITasksTableProps {
  tasks: ITask[];
  showLable: boolean;
  onNewTask?: () => void;
}

interface ITaskRow {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  assignedTo: string;
}

const columns: ColDef<ITaskRow>[] = [
  {
    field: "id",
    headerName: "Id",
    width: 80,
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
    width: 150,
    valueFormatter: (taskRow) => {
      if (taskRow.data?.dueDate) {
        return dayjs(taskRow.data?.dueDate).format("MM/DD/YYYY");
      } else {
        return "";
      }
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
  },
  {
    field: "assignedTo",
    headerName: "Assigned To",
    width: 150,
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
  const { tasks, showLable, onNewTask } = props;
  const navigate = useNavigate();
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
    params.api.sizeColumnsToFit();
  };

  const onRowDoubleClicked = (event: RowDoubleClickedEvent<ITaskRow>) => {
    const taskId = event.data?.id;
    if (taskId) {
      navigate(`/tasks/${taskId}`);
    }
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
        mb: 5,
        mt: 5,
      }}
    >
      {showLable && (
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography
            gutterBottom
            variant="button"
            component="div"
            sx={{ mt: 1 }}
          >
            Tasks
          </Typography>
          <IconButton color="primary" onClick={onNewTask}>
            <AddCircleOutlineRoundedIcon />
          </IconButton>
        </Box>
      )}
      <div
        style={{ flex: "1 1 auto", alignSelf: "stretch" }}
        className="ag-theme-alpine"
      >
        <AgGridReact<ITaskRow>
          columnDefs={columns}
          rowData={rows}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          onRowDoubleClicked={onRowDoubleClicked}
        />
      </div>
    </Box>
  );
};
