export interface LoginResponse {
	status:"success" | "error";
	token?: string
	type?:'Bearer'
}