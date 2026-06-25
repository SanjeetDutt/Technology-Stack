import {useAPI} from "@/library/hook";
import {DTO} from "@/library/backend"

export const getAllBlogs = async ()=>
    await useAPI().get<DTO.Blog.Blog.Response>("/blog")