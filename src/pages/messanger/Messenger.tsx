import { FC } from 'react'
import styles from './Messenger.module.scss'
import Layout from '../../components/layout/Layout.tsx'


const Messenger: FC = () => {
    return (
        <Layout>
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
        </Layout>
    )
}

export default Messenger
