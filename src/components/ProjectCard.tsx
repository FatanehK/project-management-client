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
    <Card sx={{ maxWidth: 200 }} style={{ margin: 10 }}>
      <CardActionArea onClick={() => navigate(`${id}`)}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {id}
          </Typography>{" "}
          <Typography gutterBottom variant="h5" component="div">
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
