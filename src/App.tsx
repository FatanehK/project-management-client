import "./App.css";

import { Routes, BrowserRouter, Route } from "react-router-dom";
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

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutePaths.Home} element={<Home />} />
        <Route path={RoutePaths.Projects} element={<Projects />} />
        <Route path={RoutePaths.Tasks} element={<Tasks />} />
        <Route path={RoutePaths.Profile} element={<Profile />} />
        <Route path={RoutePaths.About} element={<About />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
