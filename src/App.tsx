import { BrowserRouter } from 'react-router-dom'
import AppRouter from './router/AppRouter.tsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ErrorHandlingMiddleware from './middleware/error-handling.middleware.ts'


function App() {
    return (

        <BrowserRouter>
            <ErrorHandlingMiddleware>
                <div className='w-full h-full dark:bg-gray-500 bg-bgGray'>
                    {/*<StrictMode>*/}
                    <AppRouter/>
                    {/*</StrictMode>*/}
                    <ToastContainer/>
                </div>
            </ErrorHandlingMiddleware>
        </BrowserRouter>

    )
}

export default App
