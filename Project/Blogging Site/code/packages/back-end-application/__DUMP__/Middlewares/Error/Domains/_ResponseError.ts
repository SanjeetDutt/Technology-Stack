export abstract class _ResponseError extends Error {
	public readonly code: number;
	public readonly errorMessage: string|undefined;
	public readonly description: string|undefined;

	protected constructor(code:number, message?:string, description?:string) {
		super(`${code}`)
		this.code = code
		this.errorMessage = message
		this.description = description

		Object.setPrototypeOf(this, _ResponseError.prototype)

		Error.captureStackTrace(this, this.constructor);
	}
}