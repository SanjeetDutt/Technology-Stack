import { QUERY } from "../Endpoint";
import { _Properties, PropertyObject } from "./_Properties";
import Express from "express"

export class Query<Q extends QUERY | undefined = {}> extends _Properties<Q>{

    protected getObjectFromRequest(request: Express.Request):PropertyObject<Q>{

        return Object(request.query) as PropertyObject<Q>
    }
}