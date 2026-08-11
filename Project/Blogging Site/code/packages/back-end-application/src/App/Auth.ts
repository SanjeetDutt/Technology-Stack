import {Authentication, Request, Response, } from "common-back-end"
export default class Auth implements Authentication{
    authentication(request: Request, response: Response): void {
        throw new Error("Method not implemented.");
    }
}