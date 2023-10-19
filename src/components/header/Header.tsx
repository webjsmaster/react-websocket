import { FC, useState } from 'react'
import style from './Hader.module.scss'
import SocketApi from '../../api/socket-api.ts'


const Header: FC<{ message: string, error: string }> = ({ message, error }) => {

    const [text, setText] = useState<string>('')


    const handleInput = (value: string) => {
        setText(value)
    }

    const handleClick = () => {
        SocketApi.socket?.emit('server-path', text)
        setText('')
    }


    return (
        <div className={ style.header }>
            <input type="text" onChange={ (e) => handleInput(e.target.value) } value={ text }/>
            <button onClick={ handleClick }>SEND MESSAGE</button>

            <div>{message && JSON.parse(message).dto}</div>
            {error && <div className='text-red-400'>{JSON.parse(error).type}</div>}
        </div>
    )
}

export default Header
