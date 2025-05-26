import type {Property as _Property} from "./Property"
import type {
	Color as _Colors,
	ColorShade as _ColorShade,
	ColorUtilityType as _ColorUtilityType,
	ColorPallet as _ColorPallet,
	ThemeColor as _ThemeColor,
	UtilityPallet as _UtilityPallet
} from "./Colors"
import type {DefaultMeasurement as _DM, Measurement as _Measurement} from "./Measurement"
export {Theme} from "./Colors"
import type {BreakpointMap as _BreakpointMap} from "../store/"

// Only export those property which will be used across various packages
export namespace Styling {
	export type DefaultMeasurement = _DM
	export type Property<T extends {} = {}> = _Property<T>
	export type Measurement = _Measurement
	export type BreakpointMap = _BreakpointMap

	//NEED TO DECIDE
	export type Color = _Colors
	export type ThemeColor = _ThemeColor
	export type ColorPallet = _ColorPallet
	export type UtilityPallet = _UtilityPallet
	export type ColorShade = _ColorShade
	export type ColorUtility = _ColorUtilityType
}