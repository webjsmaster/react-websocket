import { instance } from './api.ts'
import { IFriendDataRequest } from '../store/types.ts'

export const apiFriends = {
    async addFriend(data: IFriendDataRequest) {
        return await instance.post(`friends/${data.id}`, {
            friendId: data.friendId
        }, {
            headers: {
                'authorization': `Bearer ${data.token}`
            }
        }).then(response => response.data)
    },
    async removeFriend(data: IFriendDataRequest) {
        return await instance.delete(`friends/${data.id}`, {
            headers: {
                'authorization': `Bearer ${data.token}`
            },
            data: {
                friendId: data.friendId
            }
        }).then(response => response.data)
    }
}
