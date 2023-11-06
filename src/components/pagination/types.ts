import { IMetaResponse } from '../../store/slice/types.ts'

export interface IPropsPagination {
    meta: IMetaResponse
    isLoading: boolean | undefined
    handlerChangePage: (params: number) => void
}
