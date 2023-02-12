import { Box } from "@mui/system";
import { GoogleAuth } from "../components/GoogleSignIn";

export const Home: React.FC = () => {
  return (
    <Box
      sx={{
        p: 2,
        minWidth: 300,
      }}
    >
      <GoogleAuth />
    </Box>
  );
};
