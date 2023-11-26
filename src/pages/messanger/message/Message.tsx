import { FC, useEffect, useState } from 'react'
import { IPropsMessage } from '../types.ts'
import cn from 'classnames'
import styles from './Message.module.scss'
import { convertTimstamp } from '../../../utils/convertTimestamp.ts'

const Message: FC<IPropsMessage> = ({ message, isMy }) => {


    const [time, setTime] = useState<string>('')


    useEffect(() => {
        setTime(convertTimstamp(message.createdAt).time)
    }, [message.createdAt])


    return (
        <div className={ styles.wrapper }>
            <div className={ cn(styles.message, isMy && styles.messageIsMy) }>
                <div className={ styles.time }>{time}</div>
                <div>
                    {message.content}
                </div>
            </div>
        </div>

    )
}

export default Message
