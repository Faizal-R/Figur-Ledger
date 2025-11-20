import container from ".";
import {DI_TOKENS} from './types'
import AuthController from "../presentation/controllers/AuthController";
import IAuthController from "../presentation/controllers/interfaces/IAuthController";

container.bind<IAuthController>(DI_TOKENS.CONTROLLERS.AUTH_CONTROLLER).to(AuthController)