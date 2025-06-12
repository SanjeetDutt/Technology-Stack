import {Container, type IconProps, Icons, Image} from "sanjeet-ui";
import logoSmall from "../../../assets/logo-small.png"
import logoBig from "../../../assets/logo-big.png"
import type {StyledComponent} from "../../../configurations";

interface SidebarHeaderProps {
	isExpanded: boolean
}

const DotContainer :StyledComponent = {
	display:"flex",
	padding:["10px","10px","20px"]
}

const DotStyling:IconProps = {
	size:"20px",
}

export const SidebarHeader = (props:SidebarHeaderProps) =>
	<Container justifyContent="center" flexDirection="column" padding={["10px","10px"]}>
		<Container {...DotContainer} justifyContent={props.isExpanded ? "left" : "center"}>
			<Icons.GoDotFill {...DotStyling} color="DANGER"/>
			<Icons.GoDotFill {...DotStyling} color="WARNING"/>
			<Icons.GoDotFill {...DotStyling} color="SUCCESS"/>
		</Container>
		<Image src={props.isExpanded ? logoBig : logoSmall} height="65px" />
	</Container>