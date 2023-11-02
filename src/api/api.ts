import axios from 'axios'
import { IFormData } from '../components/form/types.ts'


const baseUrl = 'http://localhost:8080/'

export const instance = axios.create({
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json'
    },
    baseURL: baseUrl
})

export const loginApi = {
    async register(data: IFormData) {
        return await instance.post('auth/signup', JSON.stringify(data)).then(response => {
            return response.data
        }).catch(error => {
            throw error.response.data
        })
    },
    async login(data: IFormData) {
        return await instance.post('auth/login', JSON.stringify(data)).then(response => {
            return response.data
        }).catch(error => {
            throw error.response.data
        })
    },
    async check(data: IFormData) {
        return await instance.post('auth/login', JSON.stringify(data)).then(response => {
            return response.data
        }).catch(error => {
            throw error.response.data
        })
    }
}
