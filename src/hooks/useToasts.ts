import { toast } from 'react-toastify'


export const useToasts = () => {
    const showToastSuccess = (message: string) => toast.success(message, {
        position: toast.POSITION.TOP_RIGHT
    })
    const showToastInfo = (message: string) => toast.info(message, {
        position: toast.POSITION.TOP_RIGHT
    })
    const showToastWarning = (message: string) => toast.warning(message, {
        position: toast.POSITION.TOP_RIGHT
    })
    const showToastError = (message: string) => toast.error(message, {
        position: toast.POSITION.TOP_CENTER
    })

    return { showToastSuccess, showToastInfo, showToastWarning, showToastError }
}
