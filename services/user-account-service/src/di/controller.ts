import container from ".";

import {DI_TOKENS} from "./types";

import { UserController } from "../interfaces/controllers/implements/UserController";
import { AccountController } from "../interfaces/controllers/implements/AccountController";



container.bind(DI_TOKENS.CONTROLLERS.USER_CONTROLLER).to(UserController);
container.bind(DI_TOKENS.CONTROLLERS.ACCOUNT_CONTROLLER).to(AccountController);