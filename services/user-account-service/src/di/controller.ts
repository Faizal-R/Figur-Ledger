import container from ".";

import {DI_TOKENS} from "./types";

import { AuthController } from "../interfaces/controllers/implements/AuthController";
import { UserController } from "../interfaces/controllers/implements/UserController";


container.bind(DI_TOKENS.CONTROLLERS.AUTH_CONTROLLER).to(AuthController);
container.bind(DI_TOKENS.CONTROLLERS.USER_CONTROLLER).to(UserController);