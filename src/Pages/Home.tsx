import { Box } from "@mui/system";
import { useAtom } from "jotai";
import { GoogleAuth } from "../components/GoogleSignIn";
import { currentUserAtom } from "../state/atoms";
import { Button, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../contants";
//           "radial-gradient(circle at 67% 83%, hsla(317,0%,96%,0.05) 0%, hsla(317,0%,96%,0.05) 1%,transparent 1%, transparent 5%,transparent 5%, transparent 100%),radial-gradient(circle at 24% 80%, hsla(317,0%,96%,0.05) 0%, hsla(317,0%,96%,0.05) 27%,transparent 27%, transparent 63%,transparent 63%, transparent 100%),radial-gradient(circle at 23% 5%, hsla(317,0%,96%,0.05) 0%, hsla(317,0%,96%,0.05) 26%,transparent 26%, transparent 82%,transparent 82%, transparent 100%),radial-gradient(circle at 21% 11%, hsla(317,0%,96%,0.05) 0%, hsla(317,0%,96%,0.05) 35%,transparent 35%, transparent 45%,transparent 45%, transparent 100%),radial-gradient(circle at 10% 11%, hsla(317,0%,96%,0.05) 0%, hsla(317,0%,96%,0.05) 21%,transparent 21%, transparent 81%,transparent 81%, transparent 100%),radial-gradient(circle at 19% 61%, hsla(317,0%,96%,0.05) 0%, hsla(317,0%,96%,0.05) 20%,transparent 20%, transparent 61%,transparent 61%, transparent 100%),radial-gradient(circle at 13% 77%, hsla(317,0%,96%,0.05) 0%, hsla(317,0%,96%,0.05) 63%,transparent 63%, transparent 72%,transparent 72%, transparent 100%),radial-gradient(circle at 30% 93%, hsla(317,0%,96%,0.05) 0%, hsla(317,0%,96%,0.05) 33%,transparent 33%, transparent 82%,transparent 82%, transparent 100%),linear-gradient(90deg, rgba(194,22,207, 0),rgb(142,36,170));",

export const Home: React.FC = () => {
  const [currentUser] = useAtom(currentUserAtom);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage:
          "radial-gradient(circle at 40% 91%, rgba(251, 251, 251,0.04) 0%, rgba(251, 251, 251,0.04) 50%,rgba(229, 229, 229,0.04) 50%, rgba(229, 229, 229,0.04) 100%),radial-gradient(circle at 66% 97%, rgba(221,176,252, 0) 0%, rgba(221,176,252, 0) 50%,rgba(46, 46, 46,0.04) 50%, rgba(46, 46, 46,0.04) 100%),radial-gradient(circle at 86% 7%, rgba(40, 40, 40,0.04) 0%, rgba(40, 40, 40,0.04) 50%,rgba(200, 200, 200,0.04) 50%, rgba(200, 200, 200,0.04) 100%),radial-gradient(circle at 15% 16%, rgba(99, 99, 99,0.04) 0%, rgba(99, 99, 99,0.04) 50%,rgba(45, 45, 45,0.04) 50%, rgba(45, 45, 45,0.04) 100%),radial-gradient(circle at 75% 99%, rgba(243, 243, 243,0.04) 0%, rgba(243, 243, 243,0.04) 50%,rgba(37, 37, 37,0.04) 50%, rgba(37, 37, 37,0.04) 100%),linear-gradient(360deg, rgb(255,255,255),rgb(142,36,170));",
        height: "100%",
        width: "100%",
      }}
    >
      <Typography variant="h2" sx={{ fontWeight: 100 }}>
        Simple Project Manager
      </Typography>
      <Divider sx={{ m: 2, width: "50vw" }} />
      <Typography variant="h6" sx={{ mb: 10 }}>
        A Simple Way to Manage All your Projects and Tasks
      </Typography>
      {!currentUser && <GoogleAuth />}
      {currentUser && (
        <Button
          variant="outlined"
          sx={{ width: 200 }}
          onClick={() => navigate(RoutePaths.Projects)}
        >
          Projects
        </Button>
      )}
    </Box>
  );
};
