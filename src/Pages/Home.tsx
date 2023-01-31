import { useState } from "react";
import { Link } from "react-router-dom";
import { ProjectCard } from "../components/ProjectCard";
import { ResponsiveAppBar } from "../components/TopBar";
import { GetProjects } from "../services/requestHandlers";
import { IProject } from "../types";

export const Home: React.FC = () => {
  const [projectList, setprojectList] = useState<Array<IProject>>([]);

  const onLoadData = async () => {
    const projects = await GetProjects(9);
    setprojectList(projects);
  };

  return (
    <div>
      <ResponsiveAppBar />
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <div>
        <button onClick={onLoadData}>click</button>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {projectList.map((p) => (
            <ProjectCard title={p.title} description={p.description ?? ""} />
          ))}
        </div>
      </div>
    </div>
  );
};
