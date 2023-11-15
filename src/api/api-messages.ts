import { instance } from './api.ts'
import { IGetMessagesDataRequest } from '../store/types.ts'

export const apiMessages = {
    async getMessages(data: IGetMessagesDataRequest) {
        return await instance.get(`message/${data.recipientId}`, {
            headers: {
                'authorization': `Bearer ${data.token}`
            }
        }).then(response => response.data)
    }
}
