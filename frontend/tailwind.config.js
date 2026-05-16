/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,html}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            },
            colors: {
                neon: {
                    cyan: '#00f3ff',
                    magenta: '#ff00ff',
                    lime: '#00ff00',
                    yellow: '#f3ff00'
                }
            },
            animation: {
                'glow': 'glow 2s ease-in-out infinite alternate',
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'slide-up': 'slideUp 0.5s ease-out forwards',
            },
            keyframes: {
                glow: {
                    'from': { 'text-shadow': '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #00f3ff, 0 0 40px #00f3ff' },
                    'to': { 'text-shadow': '0 0 20px #fff, 0 0 30px #ff00ff, 0 0 40px #ff00ff, 0 0 50px #ff00ff' }
                },
                fadeIn: {
                    'from': { opacity: '0' },
                    'to': { opacity: '1' }
                },
                slideUp: {
                    'from': { transform: 'translateY(20px)', opacity: '0' },
                    'to': { transform: 'translateY(0)', opacity: '1' }
                }
            }
        },
    },
    plugins: [daisyui],
    daisyui: {
        themes: [
            {
                neon: {
                    "primary": "#00f3ff",
                    "secondary": "#ff00ff",
                    "accent": "#00ff00",
                    "neutral": "#1b1d2b",
                    "base-100": "#11121a",
                    "info": "#00d5ff",
                    "success": "#00ff85",
                    "warning": "#ffbe00",
                    "error": "#ff5861",
                },
            },
            "synthwave",
            "dark",
        ],
    },
}
