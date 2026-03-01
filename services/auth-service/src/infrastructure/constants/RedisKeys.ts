export const RedisKeys={
 TEMP_REGISTRATION:(email:string)=>`temp:registration:${email}`,
 VERIFICATION_CODE:(email:string)=>`verification:code:${email}`


}