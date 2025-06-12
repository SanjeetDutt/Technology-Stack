
import {Provider} from "react-redux";
import {_Store} from "./_Store";
import {useCallback, useEffect} from "react";
import {useBreakpoint, useTheme} from "./hooks";
import {type Styling, Theme} from "../../styling";

export type UiStoreProviderProps = {
	children?: React.ReactNode;
	breakpoint: Styling.BreakpointMap;
	defaultTheme: Theme;
	lightThemeColor: Styling.ColorPallet;
	darkThemeColor: Styling.ColorPallet;
	utilityPallet: Styling.UtilityPallet;
}

export const UserInterfaceProvider = (props:UiStoreProviderProps)=>(
	<Provider store={_Store}>
		<MountWithValues {...props} />
	</Provider>
)

const MountWithValues = (props:UiStoreProviderProps)=>{
	const breakpoint = useBreakpoint()
	const theme = useTheme()

	const onViewPortChange = useCallback(()=>{
		//TODO: This is calling multiple times due to strict mode, find out a way
		breakpoint.setViewPort({
			width: `${window.innerWidth}px`,
			height: `${window.innerHeight}px`
		})
	},[window.innerWidth, window.innerHeight])

	useEffect(() => {
		breakpoint.setBreakpoint(props.breakpoint)
		theme.setCurrentTheme(props.defaultTheme)
		theme.setLightThemeColor(props.lightThemeColor)
		theme.setDarkThemeColor(props.darkThemeColor)
		theme.setUtilityPallet(props.utilityPallet)

		onViewPortChange()
		window.addEventListener("resize", onViewPortChange);

		return ()=>{
			window.removeEventListener("resize", onViewPortChange);
		}

	}, []);

	return props.children
}