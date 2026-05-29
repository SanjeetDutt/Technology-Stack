import {ServiceFunction} from "../type";
import {Blog, notEmpty, notNull, RequestProps, ValidationError, validSlug} from "../../Controlers";
import {createTag, getAllTag, getCategoryBySlug, getTagBySlug, updateTag} from "../../Database/Repositories/Blog";
import {TagEntity} from "../../Database";

interface TagService{
	getTags: ServiceFunction<{}, Blog.Tag.Response[]>;
	addTag: ServiceFunction<Blog.Tag.Request, Blog.Tag.Response>
	updateTag: ServiceFunction<Blog.Tag.Request, Blog.Tag.Response, {slug: string}>
}

export const tagService:TagService = {
	async addTag(request: RequestProps<Blog.Tag.Request, {}>): Promise<Blog.Tag.Response> {
		validateTagRequest(request.body)
		await validateTagSlug(request.body.slug)
		const tag = await createTag(request.body.title, request.body.slug)
		return {
			title: tag.title,
			slug: tag.slug,
		}
	},
	async getTags(request: RequestProps<{}, {}>): Promise<Blog.Tag.Response[]> {
		const tags = await getAllTag()
		return tags.map(t=>({title: t.title, slug: t.slug}))
	},
	async updateTag(request: RequestProps<Blog.Tag.Request, { slug: string }>): Promise<Blog.Tag.Response> {
		validateTagRequest(request.body)

		const tag = await getTagBySlug(request.params.slug)
		if(!tag){
			throw new ValidationError("Tag not found with provided slug "+ request.params.slug)
		}

		await validateTagSlug(request.body.slug, tag)

		tag.title = request.body.title
		tag.slug = request.params.slug
		const updatedTag = await updateTag(tag)
		return {
			title: updatedTag.title,
			slug: updatedTag.slug
		}
	},
}

const validateTagRequest = (req: Blog.Tag.Request)=>{
	notNull({title: req.title, slug: req.slug})
	notEmpty({name: req.title, slug: req.slug})
	validSlug({slug: req.slug})
}

const validateTagSlug = async (slug: string, except?: TagEntity)=>{
	const tag = await getCategoryBySlug(slug)
	if(tag){
		if(except && tag.id === except.id){
			return
		}

		throw new ValidationError(`Tag with ${slug} already exists`)
	}
}