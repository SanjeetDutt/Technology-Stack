import {ActionBuilder} from "./ActionBuilder"
import {Bridge} from "../Type"

export const POST = <
    P extends Bridge.Path
>(url: P) =>
    new ActionBuilder<P>("POST", url)


export const GET = <
    P extends Bridge.Path
>(url: P) =>
    new ActionBuilder<P>("GET", url)