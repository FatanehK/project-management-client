import { Box, Button, Container } from "@mui/material";
import { default as Grid } from "@mui/material/Unstable_Grid2";
import { ProjectCard } from "../components/ProjectCard";
import { useEffect, useState } from "react";
import { IProject } from "../types";
import { GetProjects } from "../services/requestHandlers";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../contants";
import { useAtom } from "jotai";
import { jwtTokenAtom } from "../state/atoms";

export const Projects: React.FC = () => {
  const [jwtToken] = useAtom(jwtTokenAtom);
  const [projects, setProjects] = useState<IProject[] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProject = async () => {
      const prjs = await GetProjects(jwtToken);
      setProjects(prjs);
    };

    loadProject();
  }, [jwtToken]);

  const onNewProject = () => {
    navigate(RoutePaths.NewProject);
  };

  return (
    <Box sx={{ flex: "1 1 auto" }}>
      <Button onClick={onNewProject} sx={{ p: 3 }} startIcon={<AddIcon />}>
        New Project
      </Button>
      <Container sx={{ m: 2 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {projects?.map((project, index) => (
            <Grid xs={2} sm={4} md={4} key={index}>
              <ProjectCard
                id={project.id}
                title={project.title}
                description={project.description ?? ""}
                // status={project.status}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
