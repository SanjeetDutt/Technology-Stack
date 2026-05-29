export interface Response{
	slug: string,
	title: string,
	description: string,
	user:{
		name: string,
		email: string,
	},
	category:{
		title: string,
		slug: string
	},
	tags:{
		title: string,
		slug: string
	}[]
}

export interface Request {
	slug: string,
	title: string,
	description: string,
	userEmail:string,
	categorySlug: string,
	tagSlugs:string[]
}