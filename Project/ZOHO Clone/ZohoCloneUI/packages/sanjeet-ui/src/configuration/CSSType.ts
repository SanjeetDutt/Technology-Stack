import type {Styling} from "../styling";

/**
 * Use this file to override any default property value provided by csstype
 */
export type ModifiedStandardProperty = {
	padding: Measurement | Measurement[] | "auto" | "unset"
	margin: Measurement | Measurement[] | "auto" | "unset"
	width: Measurement | Measurement[] | "auto" | "unset"
	height: Measurement | Measurement[] | "auto" | "unset"
	backgroundColor: Color
}

type Measurement = Styling.Measurement
type Color = Styling.Color | Styling.ColorShade | Styling.ColorUtility
