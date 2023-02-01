import { Box } from "@mui/system";
import { Outlet } from "react-router-dom";
import { ResponsiveAppBar } from "../components/TopBar";

export const PageBody: React.FC = () => {
  return (
    <Box sx={{height: "100%"}}>
      <ResponsiveAppBar />
      <Outlet />
    </Box>
  );
};
