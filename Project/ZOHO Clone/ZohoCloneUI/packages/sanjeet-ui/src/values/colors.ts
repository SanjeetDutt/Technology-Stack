import {Theme, type Styling} from "../styling";
import type {ColorMap} from "../styling/Colors.ts";

export const DEFAULT_THEME:Theme = Theme.LIGHT

const generatePallet = (colorArray:Styling.Color[]):ColorMap=>{

	const colorShade:ColorMap = {}

	for(let i = 1; i <= Math.min(colorArray.length, 9); i++){
		// @ts-ignore
		colorShade[i*100] = colorArray[i]
	}

	return colorShade

}
export const DEFAULT_COLOR_PALLET:Styling.ColorPallet = {
	"VIOLET":generatePallet(["#4a0080","#5a0796","#690dab","#7216a7","#7b1fa3","#8422a6","#8c24a8","#9426ac","#9b27b0"]),
	"INDIGO":generatePallet(["#1a1a4c","#2f2f6f","#434398","#5959c0","#6d6ddf","#8080ff","#9494ff","#a8a8ff","#bdbdff"]),
	"BLUE":generatePallet(["#0d3c68","#145c9f","#1e81ae","#2e9ccc","#4dafd5","#7dc8e3","#aad6f3","#cfe8f7","#e5f1fb"]),
	"GREEN":generatePallet(["#004d00","#196600","#338000","#4d9900","#65b300","#81cc00","#99e600","#b2ff00","#ccff33"]),
	"YELLOW":generatePallet(['#7a5400', '#a87b00', '#d6a400', '#fac400', '#ffdc2e', '#ffe75c', '#ffed85', '#fff4b3', '#fff9db']),
	"ORANGE":generatePallet(['#4d2e00', '#804d00', '#b36b00', '#e68a00', '#ff9900', '#ffad33', '#ffc680', '#ffe0b3', '#fff4e5']),
	"RED":generatePallet(['#330000', '#4d0000', '#660000', '#800000', '#990000', '#b30000', '#cc0000', '#e60000', '#ff0000']),
	"BLACK": generatePallet(["#000000","#0a0a0a","#141414","#1f1f1f","#292929","#333333","#3d3d3d","#474747","#525252"]),
	"WHITE": generatePallet(['#bfbfbf', '#c7c7c7', '#cfcfcf', '#d6d6d6', '#dedede', '#e8e8e8', '#f0f0f0', '#f7f7f7', '#ffffff'])
}

export const UTILITY_PALLET:Styling.UtilityPallet = {
	"PRIMARY" : '#a0c4ff',
	"SECONDARY" : '#ffc6ff',
	"SUCCESS" : '#caffbf',
	"DANGER" : '#ffadad',
	"WARNING" : '#fdffb6',
	"INFO" : '#9bf6ff',
	"LIGHT" : '#dedede',
	"DARK" : '#292929',
	"MUTED" : '#525252',
	"WHITE" : '#bfbfbf',
	"BLACK" : '#000000',
}