export interface IFriendDataRequest {
    id: string
    friendId: string
    token: string
}

export interface IAuthDataReqiest {
    login?: string
    email?: string
    password: string
}
