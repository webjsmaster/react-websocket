import { FC } from 'react'
import styles from './LoaderPage.module.scss'

const LoaderPage: FC = () => {
    return (
        <div className={ styles.wrapper }>
            <div className={ styles.spinner }>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default LoaderPage
