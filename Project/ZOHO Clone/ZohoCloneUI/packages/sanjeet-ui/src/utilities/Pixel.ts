import type {Styling} from "../styling";

export const getPixelValue = (str: Styling.DefaultMeasurement) =>
	Number(str.replace("px", ""));