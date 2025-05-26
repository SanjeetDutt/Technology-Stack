import type {Styling} from "../styling";

/**
 * Use this file to override any default property value provided by csstype
 */
export type ModifiedStandardProperty = {
	padding: Measurement | Measurement[]
	margin: Measurement | Measurement[]
	backgroundColor: Color
}

type Measurement = Styling.Measurement
type Color = Styling.Color | Styling.ColorShade | Styling.ColorUtility
