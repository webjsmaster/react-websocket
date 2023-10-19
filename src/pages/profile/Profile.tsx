import { createRef, FormEvent, MutableRefObject, RefObject, useEffect, useRef, useState } from 'react'
import { Cropper, ReactCropperElement } from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import './cropper/cropStyle.css'
import DownloadIcon from '../../components/icons/DownloadIcon.tsx'
import styles from './Profile.module.scss'
import { file2Base64 } from '../../utils/fale2Base64.ts'
import Layout from '../../components/layout/Layout.tsx'
import { toast } from 'react-toastify'
import { useAvatarUpdateMutation } from '../../api/newapi.ts'
import localStore from 'store'
import { LOCALSTORAGE_ITEM } from '../../utils/constants.ts'
import { useAppDispatch } from '../../hooks/hooks.ts'
import { userSlice } from '../../store/slice/UserSlice.ts'


const Upload = () => {
    const [token, setToken] = useState<{ accessToken: string }>()
    const [error, setError] = useState('')
    const [errorApi, setErrorApi] = useState('')
    const [successApi, setSuccessApi] = useState('')
    const [uploaded, setUploaded] = useState<string>('')

    const [mutation] = useAvatarUpdateMutation()

    const dispatch = useAppDispatch()


    const cropperRef: RefObject<ReactCropperElement> = createRef()
    const ref: MutableRefObject<HTMLInputElement | null> = useRef(null)

    const showToastError = (message: string) => toast.error(message, {
        position: toast.POSITION.TOP_CENTER
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
        const user = await mutation({
            id: '86aea7ec-3e8b-47f3-9c96-5ddd1c2c6145',
            avatar: cropperResult,
            token: token?.accessToken
        })

        dispatch(userSlice.actions.addUser({ user: user.data }))
    }

    const onCansel = () => {
        setUploaded('')
    }

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
                                <button className={ styles.button } onClick={ onCrop }>Сохранить</button>
                                <button className={ styles.button } onClick={ onCansel }>Отменить</button>
                            </div>
                        </>
                        :
                        <>
                            <div className={ styles.subtitle }>
                                Загрузите файл размером до 5Мб
                                <div>По формату: JPG, PNG, GIF</div>
                            </div>
                            <div className={ styles.button } onClick={ handleClick }>
                                Выбрать файл
                                <input type='file' ref={ ref } onInput={ (e) => handleFile(e) }/>
                                <div className={ styles.icon }>
                                    <DownloadIcon/>
                                </div>
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
