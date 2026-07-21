export interface Response{

}

export interface Request {
	slug: string,
	title: string,
	description: string,
	userEmail:string,
	categorySlug: string,
	tagSlugs:string[]
}