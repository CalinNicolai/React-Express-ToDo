import $api from '../HTTP/index'
import {ITask} from "../models/ITask";
import {AxiosResponse} from "axios";

export default class TaskService {
    static async addTask(task: ITask): Promise<AxiosResponse> {
        return $api.post('/createTask', task)
    }

    static async getTasks(userId: string): Promise<AxiosResponse> {
        return $api.get<ITask[]>(`/userTasks/${userId}`);
    }

    static async deleteTask(taskId: string): Promise<AxiosResponse> {
        return $api.delete(`/deleteTask/${taskId}`)
    }

    static async changeTask(task: ITask) {
        return $api.post('/changeTask', task)
    }
}
