import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import axios from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";
import AuthService from "../Services/AuthService";
import {API_URl} from "../HTTP";
import {toast} from "react-toastify";


export default class Store {
    user = {} as IUser;
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) {
            console.log(e.response?.data?.message);
            toast.error(e.response?.data?.message || "Something went wrong");
        }
    }

    async registration(email: string, password: string) {
        try {
            const response = await AuthService.registration(email, password);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(false);
            this.setUser(response.data.user);
        } catch (e: any) {
            console.log(e.response?.data?.message);
            toast.error(e.response?.data?.message || "Something went wrong");
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            console.log('Logout')
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e: any) {
            console.log(e.response?.data?.message);
            toast.error(e.response?.data?.message || "Something went wrong");
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get<AuthResponse>(`${API_URl}/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) {
            console.log(e.response?.data?.message);
            toast.error(e.response?.data?.message || "Something went wrong");
        } finally {
            this.setLoading(false);
        }
    }
}