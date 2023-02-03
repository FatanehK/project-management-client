import { Box } from "@mui/material";
import { ColDef, GridReadyEvent } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { IUser } from "../types";

export interface IUserTableProps {
  users: IUser[];
}

interface IUserRow {
  id: number;
  fullName: string;
  active: boolean;
  email: string;
}

const columns: ColDef[] = [
  { field: "id", headerName: "Id", width: 50, resizable: false },
  {
    field: "full_name",
    headerName: "Name",
    width: 200,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "is_active",
    headerName: "Active",
    width: 50,
  },
];

export const UserList: React.FC<IUserTableProps> = (props) => {
  const { users } = props;
  const rows: IUserRow[] = users.map((user) => {
    return {
      id: user.id,
      fullName: user.full_name ?? "",
      active: user.is_active ?? false,
      email: user.email
    };
  });

  const onGridReady = (params: GridReadyEvent<IUserRow>) => {
    params.api.sizeColumnsToFit();
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
      <div
        style={{ flex: "1 1 auto", alignSelf: "stretch" }}
        className="ag-theme-material"
      >
        <AgGridReact<IUserRow>
          columnDefs={columns}
          rowData={rows}
          onGridReady={onGridReady}
        />
      </div>
    </Box>
  );
};
