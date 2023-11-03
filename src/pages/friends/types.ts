export interface IUserResponse {
    id: string
    login: string
    avatar: string
    friend?: boolean
}

export interface IGetUsersResponse {
    data: IUserResponse[],
    meta: IMetaResponse
}

export interface IGetUsersRequest {
    token: string
    value: string
    page?: number
    take?: number
}

export interface IMetaResponse {
    page: number
    take: number
    itemCount: number
    pageCount: number
    hasPreviousPage: boolean
    hasNextPage: boolean
}
