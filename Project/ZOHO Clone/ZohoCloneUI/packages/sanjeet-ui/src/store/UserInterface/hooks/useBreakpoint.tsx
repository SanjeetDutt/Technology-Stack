import {useDispatch, useSelector} from "react-redux";
import type {UiStoreState} from "../_Store";
import {BreakpointAction, type BreakpointState} from "../slice";
import {getValueFromMap,getPixelValue} from "../../../utilities";
import type {Styling} from "../../../styling";

export const useBreakpoint = ()=>{
	const dispatch = useDispatch();
	const state = useSelector<UiStoreState,BreakpointState>(state=>state.breakpoint)

	return {
		setBreakpoint:(breakpointMap:Styling.BreakpointMap)=>
			dispatch(BreakpointAction.setBreakpoint(breakpointMap)),

		setViewPort:(props:{width:Styling.DefaultMeasurement, height: Styling.DefaultMeasurement})=> {

			const [key] = Object.entries(state.breakpoint).reduce(([k1,v1], [k2, v2]) => {
				if(getPixelValue(v1) < window.innerWidth){
					return [k2,v2]
				} else {
					return [k1,v1]
				}
			})

			dispatch(BreakpointAction.setViewPort({
				currentHeight: props.height,
				currentWidth: props.width,
				currentBreakpoint:key
			}))
		},

		getBreakpoint:state.breakpoint,

		getViewport:state.viewport,

		getBreakpointPx: (breakpoint:string)=>
			getValueFromMap(state.breakpoint,breakpoint),

		wrapMinWidthMQ: (breakpoint:string, stylesheet:string):string=>
			`@media (min-width: ${getValueFromMap(state.breakpoint,breakpoint)}) {
				${stylesheet}
			}`,
	}
}

export const DEFAULT_BREAKPOINT:Styling.BreakpointMap = {
	sm:"576px",
	md:"768px",
	lg:"992px",
	xl:"1200px",
	xxl:"1400px"
}