import "./App.css";
// background-image: radial-gradient(circle at 67% 83%, rgba(187,173,201, 0.05) 0%, rgba(187,173,201, 0.05) 1%,transparent 1%, transparent 5%,transparent 5%, transparent 100%),radial-gradient(circle at 24% 80%, rgba(187,173,201, 0.05) 0%, rgba(187,173,201, 0.05) 27%,transparent 27%, transparent 63%,transparent 63%, transparent 100%),radial-gradient(circle at 23% 5%, rgba(187,173,201, 0.05) 0%, rgba(187,173,201, 0.05) 26%,transparent 26%, transparent 82%,transparent 82%, transparent 100%),radial-gradient(circle at 21% 11%, rgba(187,173,201, 0.05) 0%, rgba(187,173,201, 0.05) 35%,transparent 35%, transparent 45%,transparent 45%, transparent 100%),radial-gradient(circle at 10% 11%, rgba(187,173,201, 0.05) 0%, rgba(187,173,201, 0.05) 21%,transparent 21%, transparent 81%,transparent 81%, transparent 100%),radial-gradient(circle at 19% 61%, rgba(187,173,201, 0.05) 0%, rgba(187,173,201, 0.05) 20%,transparent 20%, transparent 61%,transparent 61%, transparent 100%),radial-gradient(circle at 13% 77%, rgba(187,173,201, 0.05) 0%, rgba(187,173,201, 0.05) 63%,transparent 63%, transparent 72%,transparent 72%, transparent 100%),radial-gradient(circle at 30% 93%, rgba(187,173,201, 0.05) 0%, rgba(187,173,201, 0.05) 33%,transparent 33%, transparent 82%,transparent 82%, transparent 100%),linear-gradient(182deg, rgba(173,36,174, 0),rgb(99,25,118));

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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAtom } from "jotai";
import { currentUserAtom } from "./state/atoms";

const theme = createTheme({
  palette: {
    primary: {
      light: "#a44fbb",
      main: "#8e24aa",
      dark: "#631976",
      contrastText: "#fff",
    },
    secondary: {
      light: "#9670ff",
      main: "#7c4dff",
      dark: "#5635b2",
      contrastText: "#000",
    },
  },
});

const App: React.FC = () => {
  const [currentUser] = useAtom(currentUserAtom);
  const protectedRoutes = [
    <Route path={RoutePaths.Projects} element={<Projects />} />,
    <Route path={RoutePaths.ProjectDetail} element={<ProjectDetail />} />,
    <Route path={RoutePaths.NewProject} element={<NewProject />} />,
    <Route path={RoutePaths.Tasks} element={<Tasks />} />,
    <Route path={RoutePaths.TaskDetail} element={<TaskDetail />} />,
    <Route path={RoutePaths.NewTask} element={<NewTask />} />,
  ];
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path={RoutePaths.Home} element={<PageBody />}>
            {currentUser && protectedRoutes}
            <Route index element={<Home />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
