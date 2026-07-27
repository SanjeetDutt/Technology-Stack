import { Bridge } from "../Type";
import { ControllerBuilder } from "./ControllerBuilder";

export const CONTROLLER = (url: Bridge.Path)=>
    new ControllerBuilder(url)