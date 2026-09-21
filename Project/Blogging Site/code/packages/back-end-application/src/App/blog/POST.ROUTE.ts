/**Create new blog */

import { POST, EndpointConfig } from "common-back-end";

type CreateNewBlogConfig = EndpointConfig<{
    payload:{
        content:string,
        title: string,
    },
    response:{}
}>

export class CreateBlog extends POST<CreateNewBlogConfig>{
    execute(){
        
    }
}