/** @type {import('tailwindcss').Config} */

interface IMyColor<T> {
    [key: string]: T
}

const constants: IMyColor<string> = {
    myBlue: '#6366f1',
    bgGray: '#FAFAFC',
    bgButton: '#7675F7',
    basicGray: '#A29EB4',
    inputBorderGray: '#EFEDF7'
}

module.exports = {
    important: true,
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        fontFamily: {
            'roboto': ['Roboto', 'sans-serif']
        },
        extend: {
            colors: {
                transparent: 'transparent',
                current: 'currentColor',
                ...constants
            },
            boxShadow: {
                '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
                'card': '-5px 5px 10px 5px rgba(0, 0, 0, 0.3)',
                'auth': '0px 2px 24px 0px rgba(0, 0, 0, 0.04)'
            }
        },
        screens: {
            'lg': '1280px',
            'md': '768px',
            'tablet': '640px',
            'sm': '500px',
            'min': '120px'
        }
    },
    plugins: [],
    darkMode: 'media'
}


