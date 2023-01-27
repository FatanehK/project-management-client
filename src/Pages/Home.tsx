import { useState } from "react";
import { Link } from "react-router-dom";
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
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <div>
        <button onClick={onLoadData}>click</button>
        {projectList.map((p) => (
          <div>{p.title}</div>
        ))}
      </div>
    </div>
  );
};
