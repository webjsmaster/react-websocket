import { BrowserRouter } from 'react-router-dom'
import AppRouter from './router/AppRouter.tsx'
import { useEffect, useState } from 'react'
import { IAppRoute } from './router/types.ts'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAppSelector } from './hooks/hooks.ts'


function App() {

    const [user, setUser] = useState<IAppRoute>({ user: { role: 'USER', isAuth: true } })
    // const [count, setCount] = useState(0)=
    // const { message, error } = useConnectionSocket()
    const isAuth = useAppSelector((state) => state.auth.isAuth)

    useEffect(() => {
        setUser({ user: { isAuth: isAuth, role: 'USER' } })
    }, [isAuth])

    return (
        <BrowserRouter>
            <AppRouter user={ user.user }/>
            <ToastContainer/>
        </BrowserRouter>
    )
}

export default App
