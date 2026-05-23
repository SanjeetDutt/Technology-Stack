import {ServiceFunction} from "../type";
import {Blog} from "../../Controlers";

interface BlogService {
	createCategory: ServiceFunction<Blog.CreateCategory.Request, Blog.CreateCategory.Response>
	createTag: ServiceFunction<Blog.CreateTag.Request, Blog.CreateTag.Response>
	createBlog: ServiceFunction<Blog.CreateBlog.Request, Blog.CreateBlog.Response>
}

export const blogService:BlogService = {
	createCategory: async (request)=> {
		return {}
	},

	createTag: async (request)=>{
		return {}
	},

	createBlog: async (request)=>{
		return {}
	}
}