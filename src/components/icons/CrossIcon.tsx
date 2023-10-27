import { FC } from 'react'

const CrossIcon: FC = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" version="1.1" viewBox="0 0 32 32">
            <g transform="scale(2)">
                <circle cx="8" cy="8" r="7"/>
                <rect width="2" height="10" x="-.98" y="-16.29" transform="rotate(135)"/>
                <rect width="2" height="10" x="-12.29" y="-5.01" transform="rotate(-135)"/>
            </g>
        </svg>
    )
}

export default CrossIcon
