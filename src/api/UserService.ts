import axios, { AxiosResponse } from "axios";
import { IUser } from "../models/IUser";

export default class UserService {
    static async getUsers(): Promise<AxiosResponse<IUser>> {
        //@ts-ignore
        return axios.get<IUser[]>('./users.json')
    }
}