/**Create new blog */

import { POST, RouteConfig } from "common-back-end";

type CreateNewBlogConfig = RouteConfig<{
    PAYLOAD:{
        /**
         * Content for blog
         */
        content:string,
        /**
         * Title of the blog
         */
        title: string,
    },
    RESPONSE:{}
}>

/**
 * Create a new blog without any permission
 * @example HELLO WORLD
 */
export class CreateBlog extends POST<CreateNewBlogConfig>{
    execute(){
        
    }
}