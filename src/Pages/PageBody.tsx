import { Box } from "@mui/system";
import { Outlet } from "react-router-dom";
import { ResponsiveAppBar } from "../components/TopBar";

export const PageBody: React.FC = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <ResponsiveAppBar />
      <Box sx={{ display: "flex", flex: "1 1 auto", alignSelf: "stretch" }}>
        <Outlet />
      </Box>
    </Box>
  );
};
