export interface Response {
	status: "success" | "failure";
}

export interface Request  {
	name: string
	email: string
	password: string
}