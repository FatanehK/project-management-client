import { Box } from "@mui/system";
import { GoogleAuth } from "../components/GoogleSignIn";

export const Home: React.FC = () => {
  return (
    <Box>
      <GoogleAuth />
    </Box>
  );
};
