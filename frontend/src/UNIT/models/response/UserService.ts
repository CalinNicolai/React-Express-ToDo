import $api from "../../HTTP";
import {AxiosResponse} from "axios";
import {IUser} from "../IUser";

export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<IUser[]>>{
        return $api.get<IUser[]>('/users');
    }
}