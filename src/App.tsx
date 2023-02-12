import "./App.css";

import { Routes, BrowserRouter, Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Projects } from "./Pages/Projects";
import { Tasks } from "./Pages/Tasks";
import { RoutePaths } from "./contants";
import { ProjectDetail } from "./Pages/ProjectDetail";
import { PageBody } from "./Pages/PageBody";
import { NewProject } from "./Pages/NewProject";
import { TaskDetail } from "./Pages/TaskDetail";
import { NewTask } from "./Pages/NewTask";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutePaths.Home} element={<PageBody />}>
          <Route index element={<Home />} />
          <Route path={RoutePaths.Projects} element={<Projects />} />
          <Route path={RoutePaths.ProjectDetail} element={<ProjectDetail />} />
          <Route path={RoutePaths.NewProject} element={<NewProject />} />
          <Route path={RoutePaths.Tasks} element={<Tasks />} />
          <Route path={RoutePaths.TaskDetail} element={<TaskDetail />} />
          <Route path={RoutePaths.NewTask} element={<NewTask />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
