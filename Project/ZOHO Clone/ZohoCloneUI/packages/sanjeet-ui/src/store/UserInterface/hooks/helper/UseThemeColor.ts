import {COLOR_UTILITY, SHADE, V_I_B_G_Y_O_R} from "../../../../configuration/ColorsConfigration.ts";
import type {ColorUtilityType, ShadeType, VIBGYORType} from "../../../../styling/Colors.ts";
import {useSelector} from "react-redux";
import type {UiStoreState} from "../../_Store.tsx";
import type {ThemeState} from "../../slice";
import type {Styling} from "../../../../styling";
import {getValueFromMap} from "../../../../utilities";

export const useThemeColor = () => {

	const {currentTheme, themeColor, utility} = useSelector<UiStoreState, ThemeState>(state => state.theme);

	const currentThemePallet = getValueFromMap(themeColor, currentTheme)

	const isPrimitiveColor = (str:string) =>
		str.startsWith("rgb") || str.startsWith("#")

	const isUtilityColor = (str:string) =>
		COLOR_UTILITY.includes(str as ColorUtilityType)

	const isColorShade = (str:string) => {
		const [code,shade] = str.split("-")
		return V_I_B_G_Y_O_R.includes(code as VIBGYORType) && SHADE.includes(Number(shade) as ShadeType)
	}

	const isColor = (color:string):boolean=>
		isPrimitiveColor(color) || isColorShade(color) || isUtilityColor(color)

	const getColor = (color:string):string=>{
		if (isPrimitiveColor(color)) {
			return  color
		}

		//PRIMARY , SECONDARY, etc...
		if(isUtilityColor(color)) {
			const utilityColor = color as keyof Styling.UtilityPallet
			return getValueFromMap(utility, utilityColor)
		}

		// RED-100, etc...
		if(isColorShade(color)) {
			const [shade, number] = color.split("-")
			const colorPallet = getValueFromMap(currentThemePallet, shade)
			return getValueFromMap(colorPallet,number)
		}

		console.warn(`Invalid color ${color}`)
		return ""
	}

	return {
		isColor,
		getColor
	}
}