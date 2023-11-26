import { FC } from 'react'
import styles from './WritingMessage.module.scss'

const WritingMessage: FC = () => {
    return (
        <div>
            <div className={ styles.bouncer }>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default WritingMessage
