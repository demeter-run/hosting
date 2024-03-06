import type { Config } from 'tailwindcss';

export default {
    content: ['./app/**/*.{js,jsx,ts,tsx}', './node_modules/preline/preline.js'],
    darkMode: 'class',
    theme: {
        transitionDuration: {
            DEFAULT: '400ms',
        },
        fontFamily: {
            sans: ['Inter', 'sans-serif'],
            mono: ['Roboto Mono', 'monospace'],
        },
        extend: {
            spacing: {
                '8xl': '96rem',
                '9xl': '128rem',
            },
            borderRadius: {
                '4xl': '2rem',
            },
            colors: {
                gray: {
                    50: '#efefef',
                    100: '#e6e6e6', // -10
                    150: '#dddddd', // -10
                    200: '#d4d4d4', // -10
                    300: '#c1c1c1', // -20
                    400: '#a0a0a0', // -35
                    500: '#808080', // middle
                    600: '#616161', // +35
                    700: '#3e3e3e', // +20
                    800: '#2b2b2b', // +10
                    850: '#222222', // +10
                    900: '#191919', // +10
                    950: '#101010',
                },
                // accent1: '#16a34a', // green 600
                // accent2: '#166534', // green 800
                // accent1: '#2563eb', // blue 600
                // accent2: '#1e40af', // blue 800
                // accent1: '#059669', // emerald 600
                // accent2: '#065f46', // emerald 800
                accent1: '#4f46e5', // indigo 600
                accent2: '#3730a3', // indigo 800
                green1: '#44D163',
                red1: '#ef4444',
                yellow1: '#F5BC29',
            },
        },
    },
    plugins: [require('preline/plugin'), require('@tailwindcss/forms')],
} satisfies Config;
