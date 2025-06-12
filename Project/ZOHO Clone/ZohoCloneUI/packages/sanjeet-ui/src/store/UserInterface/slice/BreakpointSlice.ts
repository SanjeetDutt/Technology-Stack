import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {DEFAULT_BREAKPOINT} from "../hooks";
import type {Styling} from "../../../styling";

export type BreakpointMap = {
	[key: string]: Styling.DefaultMeasurement
};

export type ViewportState = {
	currentBreakpoint : string
	currentWidth:Styling.DefaultMeasurement
	currentHeight:Styling.DefaultMeasurement
}

export type BreakpointState = {
	breakpoint : BreakpointMap,
	viewport : ViewportState
}

const initialState: BreakpointState = {
	breakpoint : DEFAULT_BREAKPOINT,
	viewport : {
		currentBreakpoint : "",
		currentHeight:"0px",
		currentWidth:"0px",
	}
}

export const BreakpointSlice = createSlice({
	name: "BreakpointSlice",
	initialState: initialState,
	reducers:{
		setBreakpoint:(state, {payload}:PayloadAction<BreakpointMap>)=>{
			return {
				...state,
				breakpoint: payload
			}
		},
		setViewPort:(state, {payload}:PayloadAction<ViewportState>)=>{
			return{
				...state,
				viewport: payload
			}
		}
	},
})

export const BreakpointReducer = BreakpointSlice.reducer

export const BreakpointAction = BreakpointSlice.actions

/**
 * Function to store the break point to the redux store
 * This will include logic to handle the breakpoint values if not provided
 * Basically it wil fallback to the next breakpoint value
 * EX: if sm is not provided, it will fall back to md value
 */
// export const getBreakpointMap = (breakpointUserInput:Partial<BreakpointMap>):BreakpointMap=>{
// 	const {sm,md,lg,xl,xxl} = breakpointUserInput
// 	const biggestWidth:DefaultMeasurement = "10000px"
//
// 	return {
// 		sm: sm || md || lg || xl || xxl || biggestWidth,
// 		md: md || lg || xl || xxl || biggestWidth,
// 		lg: lg || xl || xxl || biggestWidth,
// 		xl: xl || xxl || biggestWidth,
// 		xxl: xxl || biggestWidth,
// 	}
// }
