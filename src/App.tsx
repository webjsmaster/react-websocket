import { BrowserRouter } from 'react-router-dom'
import AppRouter from './router/AppRouter.tsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ErrorHandlingMiddleware from './middleware/error-handling.middleware.ts'
import { StrictMode } from 'react'


function App() {
    return (
        <StrictMode>
            <BrowserRouter>
                <ErrorHandlingMiddleware>
                    <div className='w-full h-full dark:bg-gray-500 bg-bgGray'>
                        <AppRouter/>
                        <ToastContainer/>
                    </div>
                </ErrorHandlingMiddleware>
            </BrowserRouter>
        </StrictMode>
    )
}

export default App
