/** @type {import('tailwindcss').Config} */

interface IMyColor<T> {
    [key: string]: T
}

const constants: IMyColor<string> = {
    myBlue: '#6366f1',
    bgGray: '#FAFAFC',
    bgButton: '#7675F7',
    basicGray: '#A29EB4',
    inputBorderGray: '#EFEDF7',
    themeGreen: '#0EA7A0',
    themeRed: '#F33'
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
            },
            animation: {
                spinnerOne: 'spinnerOne 1.2s linear infinite',
                spinnerTwo: 'spinnerTwo 1.2s linear infinite'
            },
            keyframes: {
                spinnerOne: {
                    '0%': { transform: 'rotate(0deg)' },
                    '50%': { transform: 'rotate(180deg)', borderWidth: '1px' },
                    '100%': { transform: 'rotate(360deg)' }
                },
                spinnerTwo: {
                    '0%': { transform: 'rotate(0deg)', borderWidth: '1px' },
                    '50%': { transform: 'rotate(180deg)', borderWidth: '10px' },
                    '100%': { transform: 'rotate(360deg)', borderWidth: '1px' }
                }
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


