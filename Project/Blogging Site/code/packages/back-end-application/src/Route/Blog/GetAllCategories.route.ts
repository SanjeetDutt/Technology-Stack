import { GET, POST } from 'common-back-end';
import { CategoryResponse } from '../../Response/Category.Response';


export const GetAllCategories =
    GET<{ id: string }>("/categories/:id")
    .auth(()=>true)
    .service(async (r)=>{
        return {}
    })
    .REST()

export const PostNewCategory =
    POST<{},CategoryResponse,CategoryResponse>("/categories")
    .auth(()=>true)
    .service(async(r)=>{
        return {
            id:""
        } as CategoryResponse
    })
    .REST()


const call = async()=>
    await GetAllCategories
    .params({id:""})
    .call()

const call2 = async ()=>
    await PostNewCategory
        .call()
