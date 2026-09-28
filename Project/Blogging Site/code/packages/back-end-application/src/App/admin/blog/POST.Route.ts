import {POST, RouteConfig} from "common-back-end"
import { AdminMiddlewareConfig } from "../Admin.middleware";

export type CreateNewBlogType = RouteConfig<{
    PAYLOAD:{},
    RESPONSE:{}
}> & AdminMiddlewareConfig

export class CreateNewBlog extends POST<CreateNewBlogType>
{
    async execute(){
        // this
    }
    
   
    
}