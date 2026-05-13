import {createGlobalStore} from "@/app/_components/store/utility";

type Theme = "LIGHT" | "DARK";

interface ThemeState {
    currentTheme: Theme
}

interface ThemeFunction {
    setTheme: (newTheme: Theme) => void
}

const store = createGlobalStore<ThemeState, ThemeFunction>((set)=>({
    currentTheme: "LIGHT",
    setTheme: (newTheme:Theme) => set((store)=>({...store, currentTheme: newTheme})),
}))

export const ThemeProvider = store.Provider
export const useTheme = store.useStore