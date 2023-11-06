import { FC } from 'react'
import { IPropsMessage } from '../types.ts'
import cn from 'classnames'
import styles from './Message.module.scss'

const Message: FC<IPropsMessage> = ({ message, isMy }) => {
    return (
        <div className={ styles.wrapper }>
            <div className={ cn(styles.message, isMy && styles.messageIsMy) }>
                {message}
            </div>
        </div>

    )
}

export default Message
