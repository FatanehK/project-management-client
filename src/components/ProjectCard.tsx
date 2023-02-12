import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Color from "color";

interface IProjectCardProps {
  id: number;
  title: string;
  description: string;
}

export const ProjectCard: React.FC<IProjectCardProps> = (props) => {
  const { id, title, description } = props;
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Card
      sx={{
        maxWidth: 400,
        height: 150,
        bgcolor: Color(theme.palette.primary.light).lighten(0.8).hex(),
      }}
    >
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
