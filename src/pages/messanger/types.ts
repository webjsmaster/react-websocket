import { IMessageResponse } from '../../store/slice/types.ts'

export interface IPropsMessage {
    message: IMessageResponse
    isMy: boolean
}
