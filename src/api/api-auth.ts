import { instance } from './api.ts'
import { IAuthDataReqiest } from '../store/types.ts'

export const apiAuth = {
    async login(data: IAuthDataReqiest) {
        return await instance.post('/auth/login', data).then(response => response.data)
    },

    async register(data: IAuthDataReqiest) {
        return await instance.post('/auth/signup', data).then(response => response.data)
    },

    async check(token: string) {
        return await instance.get('/auth/profile', {
            headers: { 'authorization': `Bearer ${token}` }
        }).then(response => response.data)
    }
}
