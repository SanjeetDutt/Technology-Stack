import { HEADER } from "../Endpoint";
import { _Properties, PropertyObject } from "./_Properties";
import Express from "express"

export class Headers<H extends HEADER | undefined = {}> extends _Properties<H>{

    protected getObjectFromRequest(request: Express.Request):PropertyObject<H>{

        return Object(request.headers) as PropertyObject<H>
    }
}