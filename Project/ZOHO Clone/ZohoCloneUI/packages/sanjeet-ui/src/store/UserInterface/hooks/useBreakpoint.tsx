import {useDispatch, useSelector} from "react-redux";
import type {UiStoreState} from "../_Store";
import {BreakpointAction} from "../slice";
import {getValueFromMap} from "../../../utilities";
import type {Styling} from "../../../styling";

export const useBreakpoint = ()=>{
	const dispatch = useDispatch();
	const state = useSelector<UiStoreState,Styling.BreakpointMap>(state=>state.breakpoint)

	return {
		setBreakpoint:(breakpointMap:Styling.BreakpointMap)=>
			dispatch(BreakpointAction.setBreakpoint(breakpointMap)),

		getBreakpoint:():Styling.BreakpointMap =>
			state,

		getBreakpointPx: (breakpoint:string)=>
			getValueFromMap(state,breakpoint),

		wrapMinWidthMQ: (breakpoint:string, stylesheet:string):string=>
			`@media (min-width: ${getValueFromMap(state,breakpoint)}) {
				${stylesheet}
			}`

	}
}

export const DEFAULT_BREAKPOINT:Styling.BreakpointMap = {
	sm:"576px",
	md:"768px",
	lg:"992px",
	xl:"1200px",
	xxl:"1400px"
}