export interface Response {
	status:"success" | "error";
	token?: string
	type?:'Bearer'
}

export interface Request{
	email: string;
	password: string;
}