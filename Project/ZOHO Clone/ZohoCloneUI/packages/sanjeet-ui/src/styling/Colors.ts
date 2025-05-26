import {COLOR_UTILITY, type SHADE, V_I_B_G_Y_O_R} from "../configuration/ColorsConfigration.ts";

export type Color =
	| `rgb(${number},${number},${number})`
	| `rgba(${number},${number},${number},${number})`
	| `#${string}`


export type ShadeType = typeof SHADE[number]

export type ColorMap = {
	[_ in ShadeType]?:Color
}


export type VIBGYORType = typeof V_I_B_G_Y_O_R[number]

export type ColorPallet = {
	[_ in VIBGYORType]?: ColorMap
}

export type ColorShade = `${VIBGYORType}-${ShadeType}`

/**
 * Currently we are supporting only two theme
 * LIGHT
 * DARK
 */
// @ts-ignore
export enum Theme {
	LIGHT = 'LIGHT',
	DARK = 'DARK',
}

export type ThemeColor = {
	[_ in Theme]: ColorPallet
}


export type ColorUtilityType = typeof COLOR_UTILITY[number]

export type UtilityPallet = {
	[_ in ColorUtilityType]? : Color
}


