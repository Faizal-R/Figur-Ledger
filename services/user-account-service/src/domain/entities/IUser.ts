import { DateString } from "../../types";
import { ROLES } from "../enums";

export interface IUser{
    _id?: string;
    fullName: string;
    email: string;
    password: string;
    role: ROLES;
    isActive:boolean
    createdAt?:DateString
}