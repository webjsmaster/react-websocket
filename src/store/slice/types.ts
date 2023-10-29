export interface IAuthSlice {
    isAuth: boolean,
}


export interface IUser {
    id: string,
    login: string,
    email?: string,
    version?: number,
    avatar: string,
    createdAt?: number,
    updatedAt?: number
}

export interface IInputValue {
    value: string
}
