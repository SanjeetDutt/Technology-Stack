import {DEFAULT_COLOR_PALLET, type Styling, Theme, UTILITY_PALLET as DEFAULT_UTILITY_PALLET} from "sanjeet-ui"

type Breakpoint = {
	sm:Styling.DefaultMeasurement,
	md:Styling.DefaultMeasurement,
	lg:Styling.DefaultMeasurement,
	xl:Styling.DefaultMeasurement,
	xxl:Styling.DefaultMeasurement,
} ;

export type StyledComponent = Styling.Property<Breakpoint>

export const BREAKPOINT:Breakpoint = {
	sm:"576px",
	md:"768px",
	lg:"992px",
	xl:"1200px",
	xxl:"1400px"
}

export const DEFAULT_THEME:Theme = Theme.LIGHT

export const UTILITY_PALLET = DEFAULT_UTILITY_PALLET

export const LIGHT_THEME_COLOR = DEFAULT_COLOR_PALLET

export const DARK_THEME_COLOR = DEFAULT_COLOR_PALLET

