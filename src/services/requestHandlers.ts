import axios from "axios";
import { useAtom } from "jotai";
import { useRef } from "react";
import { jwtTokenAtom } from "../state/atoms";
import { IProject, ITask, IUser } from "../types";

// const URL = "https://simpleprojectmanager.azurewebsites.net";
const URL = "http://127.0.0.1:5000"

export const useQuery = () => {
    const [jwtToken] = useAtom(jwtTokenAtom);
    const queries = {
        GetProjects: async () => {
            let response: Array<IProject> = []
            const request = await axios({
                method: 'get',
                url: `${URL}/projects`,
                responseType: 'json',
                headers: {
                    "x-access-token": jwtToken
                }
            })
            if (request.status !== 200) {
                throw Error("Error in saving project")
            }
            response = request.data
            return response
        },
        GetProject: async (projectId: string) => {
            let response: IProject | null = null
            const request = await axios({
                method: 'get',
                url: `${URL}/projects/${projectId}`,
                responseType: 'json',
                headers: {
                    "x-access-token": jwtToken
                }
            })
            if (request.status !== 200) {
                throw Error("Error in saving project")
            }
            response = request.data
            return response
        },
        SaveProject: async (project: Partial<IProject>) => {
            const request = await axios({
                method: 'put',
                url: `${URL}/projects/${project.id}`,
                responseType: 'json',
                data: project,
                headers: {
                    "x-access-token": jwtToken
                }
            })
            if (request.status !== 200) {
                throw Error("Error in saving project")
            }
        },
        GetProjectTasks: async (projectId: string) => {
            let response: ITask[] | null = null

            const request = await axios({
                method: 'get',
                url: `${URL}/projects/${projectId}/tasks`,
                responseType: 'json',
                headers: {
                    "x-access-token": jwtToken
                }
            })
            if (request.status !== 200) {
                throw Error("Error in saving project")
            }
            response = request.data
            return response
        },
        GetUsertasks: async () => {
            let response: ITask[] | null = null
            const request = await axios({
                method: 'get',
                url: `${URL}/users/tasks`,
                responseType: 'json',
                headers: {
                    "x-access-token": jwtToken
                }
            })
            response = request.data
            return response
        },
        GetTask: async (taskId: string) => {
            let response: Partial<ITask>
            const request = await axios({
                method: 'get',
                url: `${URL}/tasks/${taskId}`,
                responseType: 'json',
                headers: {
                    "x-access-token": jwtToken
                }
            })
            response = request.data
            return response
        },
        SaveTask: async (task: Partial<ITask>) => {
            const request = await axios({
                method: 'put',
                url: `${URL}/tasks/${task.id}`,
                responseType: 'json',
                data: task,
                headers: {
                    "x-access-token": jwtToken
                }
            })
            if (request.status !== 200) {
                throw Error("Error in saving project")
            }
        },
        CreateProject: async (project: Partial<IProject>) => {
            const request = await axios({
                method: 'post',
                url: `${URL}/projects`,
                data: {
                    title: project.title,
                    description: project.description,
                    status: project.status,
                },
                headers: {
                    "x-access-token": jwtToken
                }
            });
            if (request.status !== 201) {
                throw Error("Error in saving project")
            }
        },
        CreateTask: async (task: Partial<ITask>) => {
            const request = await axios({
                method: 'post',
                url: `${URL}/tasks`,
                headers: {
                    "x-access-token": jwtToken
                },
                data: {
                    title: task.title,
                    description: task.description,
                    status: task.status,
                    due_date: task.due_date,
                    assigned_to: task.assigned_to,
                    project_id: task.project_id
                }
            });
            if (request.status !== 201) {
                throw Error("Error in saving project")
            }
        },
        GetProjectMember: async (projectId: string) => {
            let response: IUser[] = []
            const request = await axios({
                method: 'get',
                url: `${URL}/projects/${projectId}/members`,
                responseType: 'json',
                headers: {
                    "x-access-token": jwtToken
                }
            })
            if (request.status !== 200) {
                throw Error("Error in getting user")
            }
            response = request.data
            return response
        },
        AddMemberToProject: async (projectId: string, fullName: string, email: string) => {
            const request = await axios({
                method: 'post',
                url: `${URL}/projects/${projectId}/member`,
                responseType: 'json',
                data: {
                    full_name: fullName,
                    email
                },
                headers: {
                    "x-access-token": jwtToken
                }
            })
            if (request.status !== 201) {
                throw Error("Error in adding new user")
            }
        },
        RemoveProjectMember: async (projectId: string, memberId: number) => {
            const request = await axios({
                method: 'delete',
                url: `${URL}/projects/${projectId}/member`,
                responseType: 'json',
                data: {
                    member_id: memberId,
                },
                headers: {
                    "x-access-token": jwtToken
                }
            })
            if (request.status !== 201) {
                throw Error("Error in adding new user")
            }
        },
        ValidateGoogleAuth: async (id_token: string) => {
            const request = await axios({
                method: 'post',
                url: `${URL}/google/auth`,
                responseType: 'json',
                data: {
                    id_token
                }
            })
            if (request.status !== 200) {
                throw Error("Error in Login")
            }

            const response = request.data
            return response
        }
    }

    const queriesRef = useRef(queries);
    return queriesRef.current
}