/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {

            }
        },
        fontFamily: {
            Roboto: ['Roboto, sans-serif']
        },
        screens: {
            sm: '480px',
            md: '768px',
            lg: '976px',
            xl: '1440px'
        },
        container: {
            padding: {
                xs: '0.1rem',
                sm: '2rem',
                lg: '5rem',
                xl: '12rem',
                '2xl': '15rem',

            },
            center: true
        },
    },
    plugins: [],
}
