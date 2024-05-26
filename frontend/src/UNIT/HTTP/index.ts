import axios from 'axios'

export const API_URl = `http://localhost:5000/api`

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URl
})

$api.interceptors.request.use((config) => {
 config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

export default $api;