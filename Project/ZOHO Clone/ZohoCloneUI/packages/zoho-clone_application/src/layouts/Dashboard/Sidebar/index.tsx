import {Button, Container, getPixelValue, type Styling, useBreakpoint} from "sanjeet-ui";
import {SidebarHeader} from "./Header.tsx";
import {SidebarFooter} from "./Footer.tsx";
import {useEffect, useState} from "react";
import {Icons} from "sanjeet-ui";
import type {StyledComponent} from "../../../configurations";

type SIDEBAR_STATE = "ZERO" | "COLLAPSED" | "EXPANDED"

const SIDEBAR_WIDTH:{[key: string]:Styling.DefaultMeasurement} = {
	ZERO:"0",
	COLLAPSED: "100px",
	EXPANDED: "300px",
}

const TOGGLE_BUTTON_POSITION:{[key: string]:Styling.DefaultMeasurement} = {
	ZERO:"-15px",
	COLLAPSED: `${getPixelValue(SIDEBAR_WIDTH.COLLAPSED)-10}px`,
	EXPANDED: `${getPixelValue(SIDEBAR_WIDTH.EXPANDED)-10}px`,

}

const SidebarContainer:StyledComponent = {
	flexDirection: "column",
	borderRadius: "10px",
	overflow:"clip",
	boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
	backgroundColor: "LIGHT",
	height:"auto",
	md:{
		borderRadius:"10px"
	}
}

const SidebarToggleButton:StyledComponent = {
	position: "absolute",
	top: "45px",
	backgroundColor:"SECONDARY",
	boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px",
	border:"none",
	height:"40px",
	width:"40px",
	display:"flex",
	justifyContent:"center",
	alignItems:"center",
	borderRadius:"50%",
	color:"BLACK"

}

export const Sidebar = ()=> {

	const [state, setState] = useState<SIDEBAR_STATE>("EXPANDED")
	const {getViewport} = useBreakpoint()
	const isFloatingSidebar = ["sm","md"].includes(getViewport.currentBreakpoint)

	const toggleSidebar = () => {
		setState((state) =>{
			if(isFloatingSidebar){
				return state === "EXPANDED" ? "ZERO" : "EXPANDED"
			} else{
				return state === "EXPANDED" ? "COLLAPSED" : "EXPANDED"
			}
		})
	}

	useEffect(toggleSidebar, [getViewport.currentBreakpoint, getViewport.currentHeight]);

	if(isFloatingSidebar){
		const sideBarHeight = getPixelValue(getViewport.currentHeight) - 20;
		// @ts-ignore
		SidebarContainer["height"] = `${sideBarHeight}px`
	}


	return (
		<>
			<Container {...SidebarContainer} width={SIDEBAR_WIDTH[state]} position={isFloatingSidebar ? "absolute" : "relative"}>
				<SidebarHeader isExpanded={state === "EXPANDED"}/>
				<Container flex={1}>
					Content
				</Container>
				<SidebarFooter/>
			</Container>
			<Button {...SidebarToggleButton} left={TOGGLE_BUTTON_POSITION[state]} onClick={toggleSidebar}>
				{state !== "EXPANDED" && <Icons.FaAngleRight color="RED-100" size="20px"/>}
				{state === "EXPANDED" && <Icons.FaAngleLeft color="RED-100" size="20px" />}
			</Button>
		</>
	)
}
// Inspirations:
//https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/9f7790152937841.63271a400920a.png