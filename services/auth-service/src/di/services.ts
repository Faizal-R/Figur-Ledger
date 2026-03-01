import container from ".";
import { DI_TOKENS } from "./types";

import HashService from "../infrastructure/services/hashService";
import IHashService from "../domain/interfaces/services/IHashService";

import JwtService from "../infrastructure/services/JwtService";
import IJwtService from "../domain/interfaces/services/IJwtTokenService";

container.bind<IHashService>(DI_TOKENS.SERVICES.HASH_SERVICE).to(HashService).inSingletonScope();
container.bind<IJwtService>(DI_TOKENS.SERVICES.JWT_TOKEN_SERVICE).to(JwtService).inSingletonScope();