import axios from "axios";
import { IProject } from "../types";

const URL = "http://127.0.0.1:5000";

export const GetProjects = async (adminId: number) => {
    let response: Array<IProject> = []
    try {
        const request = await axios({
            method: 'get',
            url: `${URL}/projects`,
            responseType: 'json',
            params: {
                adminId
            }
        })
        response = request.data
    } catch (error) {
        console.log(error);
    }
    return response
};

