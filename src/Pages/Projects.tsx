import { Box, Container } from "@mui/material";
import { default as Grid } from "@mui/material/Unstable_Grid2";
import { ProjectCard } from "../components/ProjectCard";
import { useEffect, useState } from "react";
import { IProject } from "../types";
import { GetProjects } from "../services/requestHandlers";

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<IProject[] | null>(null);

  useEffect(() => {
    const loadProject = async () => {
      const prjs = await GetProjects(7);
      setProjects(prjs);
    };
    loadProject();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container sx={{ m: 5 }}>
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
