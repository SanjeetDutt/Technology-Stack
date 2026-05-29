import {datasource} from "../../datasource";
import {CategoryEntity} from "../../entities";

const CategoryRepo = datasource.getRepository(CategoryEntity);

export const getAllCategories = async() => {
	return await CategoryRepo.find()
}

export const createNewCategory = async (title: string, slug: string) => {
	const newCategory = new CategoryEntity(title, slug)
	return await CategoryRepo.save(newCategory)
}

export const getCategoryBySlug = async (slug: string) => {
	return await CategoryRepo.findOne({
		where:{slug}
	})
}

export const updateCategory = async (category: CategoryEntity) => {
	return await CategoryRepo.save(category)
}