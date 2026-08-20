import { PARAM } from "../Endpoint";
import { _Properties, PropertyObject } from "./_Properties";
import Express from "express"

export class Param<P extends PARAM | undefined = {}> extends _Properties<P>{

    protected getObjectFromRequest(request: Express.Request):PropertyObject<P>{
        return Object(request.params) as PropertyObject<P>
    }
}