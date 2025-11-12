import container from ".";
import {DI_TOKENS} from './types'

import AuthUseCases from "../application/useCases/AuthUseCases";

import IAuthUseCases from "../application/useCases/interfaces/IAuthUseCases";

container.bind<IAuthUseCases>(DI_TOKENS.USE_CASES.AUTH_USE_CASES).to(AuthUseCases)

