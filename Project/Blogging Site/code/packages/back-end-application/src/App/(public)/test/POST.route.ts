import {Authentication, POST} from "common-back-end"

export class TestRoute extends POST<{
    payload:{},
    response:{}
}>{

    async execute(){
        // this
    }
}

export class AuthenticateTestRoute extends Authentication<{
    payload:{},
    response:{}
}>{
    authenticate(){
    }
    
}