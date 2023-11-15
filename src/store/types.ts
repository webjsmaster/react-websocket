export interface IFriendDataRequest {
    id: string
    friendId: string
    token: string
}

export interface IGetMessagesDataRequest {
    recipientId: string
    token: string
}

export interface IAuthDataReqiest {
    login?: string
    email?: string
    password: string
}
