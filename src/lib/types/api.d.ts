declare type DataBaseRecords = {
    _id: string;
    createdAt: string;
}
declare type SuccessfulResponse<T> = {
    message: string;
} & T
declare type ErrorResponse = {
    error: string;
}
declare type APIResponse<T> = SuccessfulResponse<T> | ErrorResponse