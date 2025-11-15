export interface ApiResponse<T>{
    data:T,
    success:boolean,
    message:string
}


export interface ApiErrorResponse{
    success:boolean,
    message:string,
    status:number,
    error?:boolean
}