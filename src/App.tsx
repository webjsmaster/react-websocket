import { BrowserRouter } from 'react-router-dom'
import AppRouter from './router/AppRouter.tsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useGetCurrentUser } from './hooks/useGetCurrentUser.ts'
import { useEffect, useState } from 'react'
import { IAppRoute } from './router/types.ts'


function App() {

    const [user, setUser] = useState<IAppRoute>({ user: { role: 'USER', isAuth: true } })
    const { user: userData } = useGetCurrentUser()

    useEffect(() => {
        setUser({ user: { isAuth: true, role: 'USER' } })
    }, [userData])

    return (
        <BrowserRouter>
            <div className='w-full h-full dark:bg-gray-500 bg-bgGray'>
                <AppRouter user={ user.user }/>
                <ToastContainer/>
            </div>
        </BrowserRouter>
    )
}

export default App
