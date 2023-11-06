import { instance } from './api.ts'
import { IGetUsersRequest } from '../pages/friends/types.ts'

export const usersApi = {
    async findUsers(data: IGetUsersRequest) {
        return await instance.get(`/user/find?value=${data.value}`, {
            params: {
                page: data.page,
                take: data.take
            },
            headers: {
                'authorization': `Bearer ${data.token}`
            }
        }).then(response => {
            return response.data
        }).catch(error => {
            throw error.response.data
        })
    },

    async getFriends(data: { id: string, token: string }) {
        return await instance.get(`friends/${data.id}`, {
            headers: {
                'authorization': `Bearer ${data.token}`
            }
        }).then(response => {
            return response.data
        }).catch(error => {
            throw error.response.data
        })
    }
}

