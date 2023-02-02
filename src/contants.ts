export const RoutePaths: { [key: string]: string } = {
    Home: "/",
    Projects: "/projects",
    ProjectDetail: "/projects/:projectId",
    NewProject: "/projects/new-prject",
    Tasks: "/tasks",
    TaskDetail: "/tasks/:taskId",
    Profile: "/profile",
    About: "/about",
    Logout: "/logout"
};

export const Status = {
    New: 'New',
    InProgress: 'InProgress',
    Completed: 'Completed',
    Abandoned: 'Abandoned'
}