import container from ".";

import { UserRegisteredConsumer

 } from "../application/consumers/UserRegisteredConsumer";
import { DI_TOKENS } from "./types";



 container
 .bind(DI_TOKENS.CONSUMERS.USER_REGISTER_CONSUMER).to(UserRegisteredConsumer)