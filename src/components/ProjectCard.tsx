import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface IProjectCardProps {
  id: number;
  title: string;
  description: string;
}

export const ProjectCard: React.FC<IProjectCardProps> = (props) => {
  const { id, title, description } = props;
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 400, height: 150 }}>
      <CardActionArea sx={{ height: "100%" }} onClick={() => navigate(`${id}`)}>
        <CardContent>
          <Typography gutterBottom>{id}</Typography>
          <Typography gutterBottom variant="h5">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
