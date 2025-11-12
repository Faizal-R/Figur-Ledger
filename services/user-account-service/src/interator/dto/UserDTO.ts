import { DateString } from "../../types";

export interface AuthUserDTO{
    id: string
    fullName:string;
    email: string
    role:string;
    isActive:boolean,
    createdAt:DateString
    phone:string
}
export interface AuthUserResponseDTO{
    user:AuthUserDTO
    accessToken:string,
    refreshToken:string
}



export interface UserDTO{
    id: string
    fullName:string;
    email: string
    role:string;
    isActive:boolean,
    createdAt:DateString,
    phone:string
}
