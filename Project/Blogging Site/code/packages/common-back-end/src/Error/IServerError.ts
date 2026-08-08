export interface IServerError extends Error{
    getCode(): number
    getMessage(): string
}