import { FC, memo, useEffect } from 'react'

const Admin: FC = () => {

    useEffect(() => {
        console.log('[6] 🍄: ADMIN PAGE')
    }, [])

    return (
        <>
            Admin PAge
        </>
    )
}

export default memo(Admin)
