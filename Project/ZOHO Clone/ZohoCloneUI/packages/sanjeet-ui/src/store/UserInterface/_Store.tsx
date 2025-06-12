import {configureStore} from "@reduxjs/toolkit";
import {BreakpointReducer, type BreakpointState, ThemeReducer, type ThemeState} from "./slice";

export type UiStoreState = {
	breakpoint: BreakpointState;
	theme: ThemeState;
}
export const _Store = configureStore<UiStoreState>({
	reducer:{
		breakpoint: BreakpointReducer,
		theme: ThemeReducer
	}
})



