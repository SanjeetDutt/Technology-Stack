import {Validation, Request} from "common-back-end"
export default class TestValidation implements Validation{
    validation(request: Request): void {
        throw new Error("Method not implemented.");
    }

}