import {AuthUser} from "../../../domain/entities/AuthUser";
import { RegisterRequestDTO } from "../../dto/request/RegisterRequestDTO";
import {AuthUserResponseDTO} from "../../dto/response/AuthUserDTO";

export default interface IAuthUseCases { 
    login(email:string,password:string):Promise<{user:AuthUserResponseDTO,accessToken:string,refreshToken:string}>
    register(payload:RegisterRequestDTO):Promise<{email:string,name:string}>
    verifyOtp(email:string,otp:string):Promise<{accessToken:string,refreshToken:string,user:AuthUserResponseDTO}>
    refreshAccessToken(refreshToken:string):Promise<{accessToken:string}>
    
}


