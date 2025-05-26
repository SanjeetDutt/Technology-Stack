import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {type Styling, Theme,} from "../../../styling";
import {DEFAULT_COLOR_PALLET, DEFAULT_THEME, UTILITY_PALLET} from "../../../values";

export interface ThemeState {
	currentTheme:Theme,
	themeColor:Styling.ThemeColor,
	utility:Styling.UtilityPallet
}

const initialState: ThemeState = {
	currentTheme: DEFAULT_THEME,
	themeColor:{
		"LIGHT":DEFAULT_COLOR_PALLET,
		"DARK":DEFAULT_COLOR_PALLET
	},
	utility:UTILITY_PALLET
}

export const ThemeSlice = createSlice(
	{
		name: "ThemeSlice",
		initialState: initialState,
		reducers:{
			setTheme:(state,{payload}:PayloadAction<Theme>)=>{
				state.currentTheme = payload;
			},
			setLightThemeColor:(state,{payload}:PayloadAction<Styling.ColorPallet>)=>{
				state.themeColor["LIGHT"] = payload;
			},
			setDarkThemeColor:(state,{payload}:PayloadAction<Styling.ColorPallet>)=>{
				state.themeColor["DARK"] = payload;
			},
			setUtilityPallet:(state,{payload}:PayloadAction<Styling.UtilityPallet>)=>{
				state.utility = payload;
			}
		}
	}
)

export const ThemeReducer = ThemeSlice.reducer

export const ThemeAction = ThemeSlice.actions