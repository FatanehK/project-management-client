import { Button, Container, Stack, TextField } from "@mui/material";

export const Profile: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Stack
        spacing={2}
        alignItems="center"
        sx={{ m: 3, "& .MuiTextField-root": { width: "100%" } }}
      >
        <TextField label="Full Name" variant="outlined" value={"Fataneh"} />
        <TextField label="Email" variant="outlined" value={"test@test.com"} />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={"12345"}
        />
        <Button variant="contained" sx={{ width: 100 }}>
          Save
        </Button>
      </Stack>
    </Container>
  );
};
