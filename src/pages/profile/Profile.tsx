import { createRef, FormEvent, MutableRefObject, RefObject, useEffect, useRef, useState } from 'react'
import { Cropper, ReactCropperElement } from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import './cropper/cropStyle.css'
import DownloadIcon from '../../components/icons/DownloadIcon.tsx'
import styles from './Profile.module.scss'
import { file2Base64 } from '../../utils/fale2Base64.ts'
import Layout from '../../components/layout/Layout.tsx'
import { toast } from 'react-toastify'
import localStore from 'store'
import { LOCALSTORAGE_ITEM } from '../../utils/constants.ts'
import { useGetCurrentUser } from '../../hooks/useGetCurrentUser'
import LoaderButton from '../../components/loaders/loader-button/LoaderButton'
import cn from 'classnames'
import { useAvatarUpdateMutation } from '../../api/api-user.rtk.ts'


const Upload = () => {
    const [token, setToken] = useState<{ accessToken: string }>()
    const [error, setError] = useState('')
    const [errorApi, setErrorApi] = useState('')
    const [successApi, setSuccessApi] = useState('')
    const [uploaded, setUploaded] = useState<string>('')

    const [mutation, { isLoading, isSuccess }] = useAvatarUpdateMutation()

    // const dispatch = useAppDispatch()

    const { user } = useGetCurrentUser()


    const cropperRef: RefObject<ReactCropperElement> = createRef()
    const ref: MutableRefObject<HTMLInputElement | null> = useRef(null)

    const showToastError = (message: string) => toast.error(message, {
        position: toast.POSITION.TOP_CENTER
    })

    const showToastSuccess = (message: string) => toast.success(message, {
        position: toast.POSITION.BOTTOM_CENTER
    })

    useEffect(() => {
        setToken(localStore.get(LOCALSTORAGE_ITEM))
    }, [])


    const handleClick = () => {
        setSuccessApi('')
        setErrorApi('')
        setError('')
        ref.current?.click()
    }


    const handleFile = async (e: FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement
        const currentFile: File = (target.files as FileList)[0]
        const type = currentFile.type.split('/')[1]

        if (currentFile.size > 5242880) {
            showToastError('Размер файла не должен превышать 5 Мб')
        } else if (type !== 'png' && type !== 'jpeg' && type !== 'svg+xml' &&
            type !== 'gif') {
            showToastError('Файл должен быть изображением')
        } else {
            file2Base64(currentFile).then((base64) => {
                console.log('[40] 🐬: ', currentFile)
                setUploaded(base64 as string)
            })
        }
    }


    const onCrop = async () => {
        const imageElement = cropperRef?.current
        const cropper = imageElement?.cropper
        const cropperResult = cropper?.getCroppedCanvas().toDataURL() as string
        localStorage.setItem('avatar-tt', cropperResult)
        await mutation({
            id: user?.id,
            avatar: cropperResult,
            token: token?.accessToken
        })
    }

    const onCansel = () => {
        setUploaded('')
    }

    useEffect(() => {
        if (isSuccess) {
            setUploaded('')
            showToastSuccess('Изменения сохранены!')
        }
    }, [isSuccess])

    return (
        <Layout>
            <div className='h-full'>
                <div className={ styles.container }>
                    <div className={ styles.title }>
                        {uploaded ? 'Фото для аватарки' : 'Загрузка аватара'}
                    </div>

                    {uploaded ?
                        <>
                            <div className='w-full mt-8'>
                                <Cropper
                                    src={ uploaded }
                                    style={ { height: 198, width: 375 } }
                                    aspectRatio={ 1 }
                                    ref={ cropperRef }
                                    background={ false }
                                    guides={ true }
                                />
                            </div>
                            <div className={ styles.blockBtn }>
                                <div className={ styles.button }>
                                    <button onClick={ onCrop } disabled={ isLoading }>
                                        {isLoading ? <LoaderButton/> : 'Сохранить'}
                                    </button>
                                </div>
                                <div className={ styles.button }>
                                    <button onClick={ onCansel } disabled={ isLoading }>
                                        {isLoading ? <LoaderButton/> : 'Отменить'}
                                    </button>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <div className={ styles.subtitle }>
                                Загрузите файл размером до 5Мб
                                <div>По формату: JPG, PNG, GIF</div>
                            </div>
                            <div className={ cn(styles.button, styles.inputBtn) } onClick={ handleClick }>
                                <div className={ styles.icon }>
                                    <DownloadIcon/>
                                </div>
                                Выбрать файл
                                <input type='file' ref={ ref } onInput={ (e) => handleFile(e) }/>
                            </div>
                        </>
                    }

                    {error && <div className={ styles.error }>{error}</div>}
                    {errorApi && <div className={ styles.error }>{errorApi}</div>}
                    {successApi && <div className={ styles.success }>{successApi}</div>}
                </div>
            </div>
        </Layout>

    )
}

export default Upload
