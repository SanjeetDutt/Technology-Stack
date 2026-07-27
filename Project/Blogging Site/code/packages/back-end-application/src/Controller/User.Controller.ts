import { CONTROLLER, POST } from "common-back-end";
import { UserService } from "../../__DUMP__";

export const User = CONTROLLER("/user")
    .build()

export const userSignup = POST("/signup")
    .controller(User)
    .validate(UserService.Signup.validation)
    .service(UserService.Signup)
    .build()

export const userLogin = POST("/login")
    .controller(User)
    .validate(UserService.Login.validation)
    .service(UserService.Login)
    .build()