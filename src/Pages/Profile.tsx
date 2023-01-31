import { Box, Button, Container, Stack, TextField } from "@mui/material";
import { ResponsiveAppBar } from "../components/TopBar";

export const Profile: React.FC = () => {
  return (
    <Box>
      <ResponsiveAppBar />
      <Stack spacing={5} alignItems="center" sx={{ mt: 5 }}>
        <TextField label="Full Name" variant="standard" value={"Ali"} />
        <TextField label="Email" variant="standard" value={"test@test.com"} />
        <TextField
          label="Password"
          variant="standard"
          type="password"
          value={"12345"}
        />
        <Button variant="contained" sx={{ width: 100 }}>
          Save
        </Button>
      </Stack>
    </Box>
  );
};