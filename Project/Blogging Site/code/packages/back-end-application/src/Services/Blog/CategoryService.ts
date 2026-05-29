import {ServiceFunction} from "../type";
import {Blog, notEmpty, notNull, RequestProps, ValidationError, validSlug} from "../../Controlers";
import {createNewCategory, getAllCategories, getCategoryBySlug, updateCategory} from "../../Database/Repositories/Blog";
import {CategoryEntity} from "../../Database";

interface CategoryService{
	getCategories: ServiceFunction<{}, Blog.Category.Response[]>
	addCategory: ServiceFunction<Blog.Category.Request, Blog.Category.Response>
	updateCategory: ServiceFunction<Blog.Category.Request, Blog.Category.Response, {slug: string}>
}

export const categoryService:CategoryService = {
	async addCategory(request: RequestProps<Blog.Category.Request, {}>): Promise<Blog.Category.Response> {
		validateCategoryRequest(request.body)
		await validateCategorySlug(request.body.slug)
		const category = await createNewCategory(request.body.title, request.body.slug)
		return {
			title: category.title,
			slug: category.slug,
		}
	},
	async getCategories(): Promise<Blog.Category.Response[]> {
		const categories = await getAllCategories()
		return categories.map(cat=>({title: cat.title, slug: cat.slug}))
	},
	async updateCategory(request: RequestProps<Blog.Category.Request, { slug: string }>): Promise<Blog.Category.Response> {
		validateCategoryRequest(request.body)
		const category = await getCategoryBySlug(request.params.slug)
		if(!category){
			throw new ValidationError("Category not found with provided slug "+ request.params.slug)
		}
		await validateCategorySlug(request.body.slug, category)

		category.slug = request.body.slug
		category.title = request.body.title
		const updatedCategory = await updateCategory(category)
		return {
			title: updatedCategory.title,
			slug: updatedCategory.slug,
		}
	},
}

const validateCategoryRequest =(req: Blog.Category.Request)=>{
	notNull({title: req.title, slug: req.slug})
	notEmpty({name: req.title, slug: req.slug})
	validSlug({slug: req.slug})
}

const validateCategorySlug = async (slug: string, except?: CategoryEntity)=>{
	const category = await getCategoryBySlug(slug)
	if(category){

		if(except && except.id === category.id){
			return
		}

		throw new ValidationError(`Category with slug ${slug} already exists`)
	}
}