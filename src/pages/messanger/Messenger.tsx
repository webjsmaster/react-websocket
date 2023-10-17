import { FC } from 'react'
import styles from './Messenger.module.scss'


const Messenger: FC = () => {
    return (
        <div className={ styles.wrapper }>
            <div className={ styles.content }>
                <nav className={ styles.navigation }>

                </nav>
                <main className={ styles.area }>
                    Area
                </main>

                <footer className={ styles.fieldMessage }>
                    Footer
                </footer>

            </div>
        </div>
    )
}

export default Messenger
