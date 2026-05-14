import {createGlobalStore} from "@/app/_components/store/utility";

type Theme = "LIGHT" | "DARK";

interface ThemeState {
    currentTheme: Theme
}

interface ThemeFunction {
    setTheme: (newTheme: Theme) => void
    toggleTheme: () => void
}

const store = createGlobalStore<ThemeState, ThemeFunction>((set)=>({
    currentTheme: "LIGHT",
    setTheme: (newTheme:Theme) => set((store)=>({...store, currentTheme: newTheme})),
    toggleTheme:()=>set(store=>({...store, currentTheme: store.currentTheme === "LIGHT"?"DARK":"LIGHT"}))
}))

export const ThemeProvider = store.Provider
export const useTheme = store.useStore