import axios from 'axios'
import { IFormData } from '../components/form/types.ts'


const baseUrl = 'http://localhost:8080/'

const instance = axios.create({
    withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': 'https://localhost:8080/',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
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
        console.log('[27] 🐬: ', data)
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
