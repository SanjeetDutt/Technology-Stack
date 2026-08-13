import {PostRoute} from "common-back-end"
export default class TestRoute extends PostRoute{

    async call(){
        console.log("CALL")
    }
}