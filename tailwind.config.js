/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {

            }
        },
        fontFamily: {
            Roboto: ["Roboto, sans-serif"]
        },
        screens: {
            sm: "480px",
            md: "768px",
            lg: "976px",
            xl: "1440px"
        }
    },
    plugins: [],
}
