import { Box, Button, Stack, TextField } from "@mui/material";
import { useParams } from "react-router-dom";

export const ProjectDetail: React.FC = () => {
  const {projectId} = useParams();
  return (
    <Box>
      <div>{`ProjectId: ${projectId}`}</div>
    </Box>
  );
};
