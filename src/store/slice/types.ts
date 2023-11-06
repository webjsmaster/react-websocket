export interface IAuthSlice extends IBaseSlice {
    isAuth?: boolean,
    user?: IUser,
}

export interface IFriendsSlice extends IBaseSlice {
    friends: IUserResponse[],
    meta: IMetaResponse
}

export interface IUsersSlice extends IBaseSlice {
    users: IUserResponse[],
    meta: IMetaResponse
}

export interface IMessangerSlice extends IBaseSlice {
    currentFriend: IUser,
}


export interface IUser {
    id: string,
    login: string,
    email?: string,
    version?: number,
    avatar: string,
    createdAt?: number,
    updatedAt?: number,
    accessToken?: string,
    refreshToken?: string
}

export interface IInputValue {
    value: string
}

export interface IBaseSlice {
    isLoading?: boolean,
    isError?: boolean,
    error?: string,
    isSuccess?: boolean
}

export interface IErrorSlise {
    response: {
        data: {
            message: string
        }
    }
}


export interface IUserResponse {
    id: string
    login: string
    avatar: string
    friend?: boolean
}

export interface IMetaResponse {
    page: number
    take: number
    itemCount: number
    pageCount: number
    hasPreviousPage: boolean
    hasNextPage: boolean
}

