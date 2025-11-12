import container from ".";

import { DI_TOKENS } from "./types";

import HashService from "../../../auth-service/src/infrastructure/services/hashService";
import JwtService from "../../../auth-service/src/infrastructure/services/JwtService";

container.bind(DI_TOKENS.SERVICES.HASH_SERVICE).to(HashService).inSingletonScope();
container.bind(DI_TOKENS.SERVICES.JWT_TOKEN_SERVICE).to(JwtService).inSingletonScope();