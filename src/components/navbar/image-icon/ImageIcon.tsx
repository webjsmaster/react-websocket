import { FC } from 'react'

const ImageIcon: FC<{ img: string }> = ({ img }) => {

    return (
        <div>
            <img src={ img } alt='img'/>
        </div>
    )
}

export default ImageIcon
