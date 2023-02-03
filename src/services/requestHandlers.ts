import axios from "axios";
import { IProject, ITask, IUser } from "../types";

const URL = "http://127.0.0.1:5000";

export const GetProjects = async (adminId: number) => {
    let response: Array<IProject> = []
    const request = await axios({
        method: 'get',
        url: `${URL}/projects`,
        responseType: 'json',
        params: {
            adminId
        }
    })
    if (request.status !== 200) {
        throw Error("Error in saving project")
    }
    response = request.data
    return response
};

export const GetProject = async (projectId: string) => {
    let response: IProject | null = null
    const request = await axios({
        method: 'get',
        url: `${URL}/projects/${projectId}`,
        responseType: 'json',
    })
    if (request.status !== 200) {
        throw Error("Error in saving project")
    }
    response = request.data
    return response
}

export const SaveProject = async (project: Partial<IProject>) => {
    const request = await axios({
        method: 'put',
        url: `${URL}/projects/${project.id}`,
        responseType: 'json',
        data: project
    })
    if (request.status !== 200) {
        throw Error("Error in saving project")
    }
}


export const GetProjectTasks = async (projectId: string) => {
    let response: ITask[] | null = null
    const request = await axios({
        method: 'get',
        url: `${URL}/projects/${projectId}/tasks`,
        responseType: 'json',
    })
    if (request.status !== 200) {
        throw Error("Error in saving project")
    }
    response = request.data
    return response

}

export const GetUsertasks = async (userId: number) => {
    let response: ITask[] | null = null
    const request = await axios({
        method: 'get',
        url: `${URL}/users/${userId}/tasks`,
        responseType: 'json',
    }
    )
    response = request.data
    return response
}

export const GetTask = async (taskId: string) => {
    let response: Partial<ITask>
    const request = await axios({
        method: 'get',
        url: `${URL}/tasks/${taskId}`,
        responseType: 'json'
    })
    response = request.data
    return response
}

export const SaveTask = async (task: Partial<ITask>) => {
    const request = await axios({
        method: 'put',
        url: `${URL}/tasks/${task.id}`,
        responseType: 'json',
        data: task

    })
    if (request.status !== 200) {
        throw Error("Error in saving project")
    }
}

export const CreateProject = async (project: Partial<IProject>) => {
    const request = await axios({
        method: 'post',
        url: `${URL}/projects`,
        data: {
            title: project.title,
            description: project.description,
            status: project.status,
            admin_id: 7
        }
    });
    if (request.status !== 201) {
        throw Error("Error in saving project")
    }
}
export const CreateTask = async (task: Partial<ITask>)=>{
    const request = await axios ({
        method: 'post',
        url: `${URL}/tasks`,
        data :{
            title: task.title,
            description: task.description,
            status: task.status,
            due_date: task.due_date,
            assigned_to: task.assigned_to
        }
    });
    if (request.status !==201){
        throw Error("Error in saving project")
    }
}

export const GetProjectMember = async (projectId:string) => {
    let response: IUser[] = []
    const request = await axios({
        method: 'get',
        url: `${URL}/projects/${projectId}/members`,
        responseType: 'json',
    })
    if (request.status !== 200) {
        throw Error("Error in getting user")
    }
    response = request.data
    return response
    
}