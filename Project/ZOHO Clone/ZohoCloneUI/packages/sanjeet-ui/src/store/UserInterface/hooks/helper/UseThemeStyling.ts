import type {Styling} from "../../../../styling";
import {useBreakpoint} from "../useBreakpoint.tsx";
import {useThemeColor} from "./UseThemeColor.ts";

const REACT_RESERVED_KEY:string[] = [
	"children", "key"
];

export const useThemeStyle = () =>{
	const {getBreakpoint, wrapMinWidthMQ} = useBreakpoint()
	const {isColor, getColor} = useThemeColor()

	const generateStylesheetWithMediaQuery = (breakpoint:string, styling : Styling.Property):string=>
		wrapMinWidthMQ(breakpoint, getStyle(styling))

	const getHyphenKey = (key:string):string =>
		key
			.replace(/([a-z0–9])([A-Z])/g, "$1-$2") //Regex to convert pascalCase to kebab-case
			.toLowerCase()

	const generateStylesheet = (key :keyof Styling.Property, value:any):string=>{
		if(!key || !value || REACT_RESERVED_KEY.indexOf(key) > -1){
			return ""
		}

		if(Array.isArray(value)){
			// ex: padding: 10px 5px 3px 1px
			return `${getHyphenKey(key)}: ${value.join(" ")}`
		}

		if(isColor(value)){
			return `${getHyphenKey(key)}: ${getColor(value)}`
		}

		// ex: padding: 10px
		return `${getHyphenKey(key)}: ${value}`
	}

	const getStyle =  (styling: Styling.Property):string=>{

		const styles:string[] = []

		const breakpoints = Object.keys(getBreakpoint)

		for(const [key, value] of Object.entries(styling)){
			styles.push(
				breakpoints.includes(key)
					? generateStylesheetWithMediaQuery(key, value as Styling.Property)
					: generateStylesheet(key as keyof Styling.Property, value)
			)
		}

		return styles.join(";")
	}

	return {
		getStyle
	}
}