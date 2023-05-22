import { defineStore } from "pinia";

export const useThemeStore = defineStore('ThemeStore', {
    state: () => {
        return {
            darkMode: false
        }
    },

    getters: {},

    actions: {
        toggelDark() {
            this.darkMode = !this.darkMode
        }
    },
})