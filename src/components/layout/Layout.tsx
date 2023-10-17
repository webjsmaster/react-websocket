import { FC, PropsWithChildren } from 'react'
import Navbar from '../navbar/Navbar.tsx'

const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div>
            <Navbar/>
            {children}
        </div>
    )
}

export default Layout
