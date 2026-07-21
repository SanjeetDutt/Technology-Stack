import { ServiceFn } from 'common-back-end';
import {
    getAllBlogs,
    getBlogBySlug
} from '@/Database'
import { BlogEntityMapUtil, BlogResponse } from '@/Services/Blog/Response.DTO';
import { ValidationError } from '@/Controlers';

export const blogService:ServiceFn<BlogResponse[]> = async()=>{
    const blogs = await getAllBlogs()
    return blogs.map(BlogEntityMapUtil)
}

export const getBlog:ServiceFn<BlogResponse,{slug: string}> = async ({slug})=>{
    const blog = await getBlogBySlug(slug)

    if(!blog){
        throw new ValidationError(`Blog not found with ${slug}`)
    }

    return BlogEntityMapUtil(blog)
}

export const updateBlog:ServiceFn<{slug: string}> = ({})=>{

}