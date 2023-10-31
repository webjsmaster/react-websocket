import { IMetaResponse } from '../../pages/home/types.ts'

export interface IPropsPagination {
    meta: IMetaResponse
    isLoading: boolean
    handlerChangePage: (params: number) => void
}
