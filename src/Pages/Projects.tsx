import { Box, Button, Container } from "@mui/material";
import { default as Grid } from "@mui/material/Unstable_Grid2";
import { ProjectCard } from "../components/ProjectCard";
import { useEffect, useState } from "react";
import { IProject } from "../types";
import { useQuery } from "../services/requestHandlers";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../contants";

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<IProject[] | null>(null);
  const navigate = useNavigate();
  const { GetProjects } = useQuery();

  useEffect(() => {
    const loadProject = async () => {
      try {
        const prjs = await GetProjects();
        setProjects(prjs);
      } catch (error) {}
    };

    loadProject();
  }, [GetProjects]);

  const onNewProject = () => {
    navigate(RoutePaths.NewProject);
  };

  return (
    <Box sx={{ flex: "1 1 auto" }}>
      <Button
        onClick={onNewProject}
        sx={{ p: 3, ml: 2 }}
        endIcon={<AddCircleOutlineRoundedIcon />}
      >
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
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
