import {useDispatch} from "react-redux";
import {ThemeAction} from "../slice";
import {type Styling, Theme} from "../../../styling";
import {type ColorPallet, type UtilityPallet} from "../../../styling/Colors.ts";
import {useThemeStyle} from "./helper/UseThemeStyling.ts";

export const useTheme = ()=>{
	const dispatch = useDispatch();
	const {getStyle} = useThemeStyle()

	return {
		//Actions
		getStyle: (styling:Styling.Property<any>):string =>
			getStyle(styling),

		//Setters
		setCurrentTheme : (theme: Theme):Theme =>
			dispatch(ThemeAction.setTheme(theme)).payload,
		setLightThemeColor : (colorPallet: ColorPallet):Styling.ColorPallet =>
			dispatch(ThemeAction.setLightThemeColor(colorPallet)).payload,
		setDarkThemeColor : (colorPallet: ColorPallet):Styling.ColorPallet =>
			dispatch(ThemeAction.setDarkThemeColor(colorPallet)).payload,
		setUtilityPallet : (utilityPallet:UtilityPallet):Styling.UtilityPallet=>
			dispatch(ThemeAction.setUtilityPallet(utilityPallet)).payload,
	}
}

