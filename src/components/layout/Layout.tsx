import { FC, PropsWithChildren } from 'react'
import Navbar from '../navbar/Navbar.tsx'


const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className='w-full h-full'>
            <Navbar/>
            {children}
        </div>
    )
}

export default Layout
