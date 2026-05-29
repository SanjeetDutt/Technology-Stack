import {ServiceFunction} from "../type";
import {AuthenticationError, Blog, RequestProps, ValidationError} from "../../Controlers";
import {
	createNewBlog,
	getAllBlogs,
	getBlogBySlug,
	getCategoryBySlug, getTagBySlug,
	updateBlog
} from "../../Database/Repositories/Blog";
import {BlogEntity, CategoryEntity, getAllUserByEmail, TagEntity, UserEntity} from "../../Database";

interface BlogService {
	getAllBlogs: ServiceFunction<{},Blog.Blog.Response[]>;
	getBlog: ServiceFunction<{},Blog.Blog.Response,{slug: string}>;
	updateBlog: ServiceFunction<Blog.Blog.Request,Blog.Blog.Response,{slug: string}>;
	createBlog: ServiceFunction<Blog.Blog.Request, Blog.Blog.Response>
}

export const blogService:BlogService = {
	async getAllBlogs(): Promise<Blog.Blog.Response[]> {
		const blogs = await getAllBlogs()
		return blogs.map(blogEntityToResponse)
	},
	async getBlog(request: RequestProps<{}, { slug: string }>): Promise<Blog.Blog.Response> {
		const blog = await getBlogBySlug(request.params.slug)
		if(!blog){
			throw new ValidationError("Blog not found with provided slug "+ request.params.slug)
		}
		return blogEntityToResponse(blog)

	},
	async updateBlog(request: RequestProps<Blog.Blog.Request, { slug: string }>): Promise<Blog.Blog.Response> {
		validateBlogRequest(request.body)

		// Getting Blog
		const blog = await getBlogBySlug(request.params.slug)
		if(!blog){
			throw new ValidationError("Blog not found with provided slug "+ request.params.slug)
		}
		await validateUniqueBlogSlug(request.body.slug, blog)

		const {category, user, tags} = await getBlogRelatedEntityFromRequest(request.body)

		blog.title = request.body.title
		blog.slug = request.body.slug
		blog.description = request.body.description
		blog.user = user
		blog.category = category
		blog.tags = tags

		const updatedBlog = await updateBlog(blog)

		return blogEntityToResponse(updatedBlog)
	},

	async createBlog(request: RequestProps<Blog.Blog.Request, {}>):Promise<Blog.Blog.Response> {
		validateBlogRequest(request.body)
		await validateUniqueBlogSlug(request.body.slug)
		const {category, tags, user} = await getBlogRelatedEntityFromRequest(request.body)
		const {slug, title, description} = request.body
		const newBlog = await createNewBlog(slug, title, description, user, category, tags)
		return blogEntityToResponse(newBlog)
	}
}

const getBlogRelatedEntityFromRequest = async (request: Blog.Blog.Request): Promise<{
	category: CategoryEntity,
	tags: TagEntity[],
	user: UserEntity
}>=>{

	// Getting category
	const category = await getCategoryBySlug(request.categorySlug)
	if(!category){
		throw new ValidationError("Category not found with provided slug "+ request.categorySlug)
	}

	// Getting Tags
	const tags: TagEntity[] = []
	for(let tagSlug of request.tagSlugs){
		const tag = await getTagBySlug(tagSlug)
		if(!tag){
			throw new ValidationError("Tag not found with provided slug "+ request.tagSlugs)
		}
		tags.push(tag)
	}

	// Getting user
	const user = await getAllUserByEmail(request.userEmail)
	if(user.length === 0 || !user[0]){
		throw new AuthenticationError("User not found with provided email "+ request.userEmail)
	}

	return {
		category, tags, user: user[0]
	}
}

const validateBlogRequest = (req: Blog.Blog.Request)=>{

}
const validateUniqueBlogSlug = async (slug: string, except?: BlogEntity)=>{
	const blog = await getBlogBySlug(slug)
	if(blog){
		if(except && except.id === blog.id){
			return
		}
		throw new ValidationError(`Blog with Slug ${slug} already exists`)
	}
}
const blogEntityToResponse = (b: BlogEntity):Blog.Blog.Response=>({
	slug: b.slug,
	title: b.title,
	description: b.description,
	user:{
		name: b.user.name,
		email: b.user.email,
	},
	category:{
		title: b.category.title,
		slug: b.category.slug
	},
	tags:b.tags ? b.tags.map(t=>({
		title: t.title,
		slug: t.slug
	})) : []
})
