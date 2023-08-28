import { defineStore } from "pinia";

export const useThemeStore = defineStore('ThemeStore', {
    state: () => {
        return {
            darkMode: false
        }
    },

    getters: {},

    actions: {
        toggleDark() {
            this.darkMode = !this.darkMode
        }
    },
})

// TODO - change theme dynamically
// https://paste.sreesanth.me/usiyamukum.coffee