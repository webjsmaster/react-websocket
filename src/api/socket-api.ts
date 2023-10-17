import io, { Socket } from 'socket.io-client'

export default class SocketApi {
    static socket: null | Socket = null

    static createConnection() {
        this.socket = io('http://localhost:8080/')

        this.socket.on('connect', () => {
            console.log('[CONNECT] 🚀')
        })

        this.socket.on('disconnect', (e) => {
            console.log('[DISCONNECT] 🚀', e)
        })

        this.socket.on('connect_error', (e) => {
            console.log('[ERROR CONNECT] 🚀', e)
        })
    }
}
