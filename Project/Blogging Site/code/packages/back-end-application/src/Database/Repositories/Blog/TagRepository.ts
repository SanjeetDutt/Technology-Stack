import {datasource} from "../../datasource";
import {TagEntity} from "../../entities";

const Tag = datasource.getRepository(TagEntity)
export const getAllTag = async ()=>{
	return await Tag.find()
}

export const getTagBySlug = async (slug: string)=>{
	return await Tag.findOne({
		where:{slug}
	})
}

export const createTag = async (title: string, slug:string) => {
	const tag = new TagEntity(title,slug)
	return await Tag.save(tag)
}

export const updateTag = async (tag: TagEntity) => {
	return await Tag.save(tag)
}