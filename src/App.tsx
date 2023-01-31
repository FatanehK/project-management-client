import "./App.css";

import { Routes, BrowserRouter, Route, Outlet } from "react-router-dom";
import { Home } from "./Pages/Home";
import { About } from "./Pages/About";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Projects } from "./Pages/Projects";
import { Tasks } from "./Pages/Tasks";
import { Profile } from "./Pages/Profile";
import { RoutePaths } from "./contants";
import { ProjectDetail } from "./Pages/ProjectDetail";
import { PageBody } from "./Pages/PageBody";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutePaths.Home} element={<PageBody />}>
          <Route index element={<Home />} />
          <Route path={RoutePaths.Projects} element={<Projects />} />
          <Route path={RoutePaths.ProjectDetail} element={<ProjectDetail />} />
          <Route path={RoutePaths.Tasks} element={<Tasks />} />
          <Route path={RoutePaths.Profile} element={<Profile />} />
          <Route path={RoutePaths.About} element={<About />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
