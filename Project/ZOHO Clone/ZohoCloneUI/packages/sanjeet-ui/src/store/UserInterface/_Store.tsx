import {configureStore} from "@reduxjs/toolkit";
import {BreakpointReducer, type BreakpointMap, ThemeReducer, type ThemeState} from "./slice";

export type UiStoreState = {
	breakpoint: BreakpointMap;
	theme: ThemeState;
}
export const _Store = configureStore<UiStoreState>({
	reducer:{
		breakpoint: BreakpointReducer,
		theme: ThemeReducer
	}
})



