import * as FaIcons from "react-icons/fa"
import * as Go from "react-icons/go"

import type {IconBaseProps} from "react-icons";
import {type Styling} from "../../styling";
import {useThemeColor} from "../../store/UserInterface/hooks/helper/UseThemeColor.ts";

const ReactIcons = {
	... FaIcons,
	...Go
}

// @ts-ignore
export interface IconProps extends IconBaseProps {
	size?: Styling.Measurement,
	color?: Styling.Color | Styling.ColorShade | Styling.UtilityPallet
}

Object.entries(ReactIcons).forEach(([key, value]) => {
	// @ts-ignore
	ReactIcons[key] = (props:IconProps)=>{
		const theme = useThemeColor()
		const color = !!props.color ? theme.getColor(String(props.color)) : undefined

		return value({
			...props,
			color: color
		})
	}

})

console.log(ReactIcons)

export const Icons = ReactIcons