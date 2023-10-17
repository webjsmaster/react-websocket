import { FC } from 'react'
import styles from './LoaderButton.module.scss'

const LoaderButton: FC = () => {
    return (
        <div className={ styles.bouncer }>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default LoaderButton
