import SocketApi from '../api/socket-api.ts'
import { useState } from 'react'
import { IChatDataResponse, IChatDataWriteMessageResponse, IMessageResponse } from '../store/slice/types.ts'
import { LOCALSTORAGE_ITEM } from '../utils/constants.ts'
import localStore from 'store'
import { useAppActions } from './hooks.ts'


export const useConnectionSocket = () => {

    const [message, setMessage] = useState<IMessageResponse>()
    const [response, setResponse] = useState<IChatDataResponse>()
    const [status, setStatus] = useState('')
    const [statusWriteMessage, setStatusWriteMessage] = useState<IChatDataWriteMessageResponse>({ userId: '', status: false })
    const [error, setError] = useState<string>('')
    const { logoutUserActionCreator } = useAppActions()


    const connectSocket = (reqData: { id: string, recipientId: string, token: string }) => {
        SocketApi.createConnection(reqData.token)

        // получаем данные из бекенда
        SocketApi.socket?.on('server-response-create-message', (data) => {
            setMessage(data)
            setError('')
        })

        SocketApi.socket?.on('server-response-messages', (data) => {
            setResponse(data)
            setError('')
        })

        SocketApi.socket?.on('server-response-write-messages', (data) => {
            setStatusWriteMessage(data)
            setError('')
        })

        SocketApi.socket?.on('user-connected', (data) => {
            setStatus(data)
        })


        SocketApi.socket?.on('server-error', (event) => {
            if (event === 'The user is not authorized') {
                localStore.remove(LOCALSTORAGE_ITEM)
                logoutUserActionCreator()
            }
            setError(JSON.stringify(event))
        })

        SocketApi.socket?.on('connect', () => {
            SocketApi.socket?.emit('emit-server', reqData)
            setError('')
        })

    }


    // useEffect(() => {
    //     connectSocket()
    // }, [])

    return { connectSocket, message, response, setResponse, error, status, statusWriteMessage }
}
