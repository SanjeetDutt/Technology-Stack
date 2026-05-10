import {ApplicationRouter} from "./utility/ApplicationRouter";
import {SignupRequest} from "../DTO/Request";
import {SignupResponse} from "../DTO/Response";

const router = ApplicationRouter()

router.post<SignupRequest,SignupResponse>("/signup", [],async (request) => {
	console.log({request})
	return {
		status:"success"
	}
})

export const UserRouter = router