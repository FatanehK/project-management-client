import axios from "axios";
import { IProject } from "../types";

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

