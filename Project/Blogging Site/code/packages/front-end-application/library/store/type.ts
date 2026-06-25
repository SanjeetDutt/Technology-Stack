export type API_Response<T = any> = {
    isLoading: boolean
    hasError: boolean
    data:T
}