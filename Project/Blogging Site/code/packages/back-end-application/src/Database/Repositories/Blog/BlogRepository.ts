import {datasource} from "../../datasource";
import {BlogEntity, CategoryEntity, TagEntity, UserEntity} from "../../entities";

const Blogs = datasource.getRepository(BlogEntity)

export const getAllBlogs = async () => {
	return await Blogs.find()
}

export const getBlogBySlug = async (slug: string) => {
	return await Blogs.findOne({where:{slug}})
}

export const updateBlog = async (blog: BlogEntity) => {
	return await Blogs.save(blog)
}

export const createNewBlog = async (slug: string, title: string, description: string, user: UserEntity, category: CategoryEntity, tags: TagEntity[])=>{
	const blog = new BlogEntity(title, slug, description, user, category)
	blog.tags = tags
	return await Blogs.save(blog)
}