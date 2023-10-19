export interface IAuthSlice {
    isAuth: boolean,
}


export interface IUserSlice {
    user: {
        id: string,
        login: string,
        email: string,
        version: number,
        avatar: string,
        createdAt: number,
        updatedAt: number
    }
}
