import SocketApi from '../api/socket-api.ts'
import { useEffect, useState } from 'react'


export const useConnectionSocket = () => {

    const [message, setMessage] = useState<string>('')
    const [error, setError] = useState<string>('')

    const connectSocket = () => {
        SocketApi.createConnection()

        // получаем данные из бекенда
        SocketApi.socket?.on('client-path', (data) => {
            setMessage(JSON.stringify(data))
            setError('')
        })

        SocketApi.socket?.on('connect_error', (event) => {
            setError(JSON.stringify(event))
        })

        SocketApi.socket?.on('connect', () => {
            setError('')
        })
    }


    useEffect(() => {
        connectSocket()
    }, [])

    return { message, error }
}
