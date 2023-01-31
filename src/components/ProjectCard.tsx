import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

interface IProjectCardProps {
  title: string;
  description: string;
}

export const ProjectCard: React.FC<IProjectCardProps> = (props) => {
  return (
    <Card sx={{ maxWidth: 200 }} style={{ margin: 10 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
