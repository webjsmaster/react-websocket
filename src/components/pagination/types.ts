import { IMetaResponse } from '../../pages/friends/types.ts'

export interface IPropsPagination {
    meta: IMetaResponse
    isLoading: boolean
    handlerChangePage: (params: number) => void
}
