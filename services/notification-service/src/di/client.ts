import container from ".";


import { DI_TOKENS } from "./types";



import { IUserServiceClient } from "../domain/interfaces/http/IUserServiceClient";
import { UserServiceClient } from "../infra/http/userServiceClient";



container.bind<IUserServiceClient>(DI_TOKENS.CLIENT.USER_SERVICE_CLIENT).to(UserServiceClient)