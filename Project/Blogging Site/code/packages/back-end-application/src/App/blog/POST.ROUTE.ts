/**Create new blog */

import { POST, RouteConfig } from "common-back-end";

type CreateNewBlogConfig = RouteConfig<{
    PAYLOAD:{
        content:string,
        title: string,
    },
    RESPONSE:{}
}>

export class CreateBlog extends POST<CreateNewBlogConfig>{
    execute(){
        
    }
}