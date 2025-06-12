import {Container} from "sanjeet-ui"
import {Sidebar} from "./Sidebar"
import {Outlet} from "react-router-dom";
import {Header} from "./Header.tsx";
import type {StyledComponent} from "../../configurations";

const DashboardContainerStyling: StyledComponent = {
	backgroundColor:"PRIMARY",
	flexGrow: 1,
	padding:"10px"
}
export const Dashboard = () =>
	<Container height="100vh">
		<Container {...DashboardContainerStyling}>
			<Sidebar />
			<Container flex="1" flexDirection="column">
				<Header />
				<Outlet />
			</Container>
		</Container>

	</Container>