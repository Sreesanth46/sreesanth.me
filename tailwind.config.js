/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "weather-primary": "#00668A",
                "weather-secondary": "#004E71"
            }
        },
        fontFamily: {
            Roboto: ["Roboto, sans-serif"]
        },
        container: {
            padding: "2rem",
            center: true
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
