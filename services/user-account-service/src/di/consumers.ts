import container from ".";
import { DI_TOKENS } from "./types";

import { UserRegisteredConsumer } from "../gateway/messaging/consumers/UserRegisteredConsumer";



container.bind(DI_TOKENS.CONSUMERS.USER_REGISTERED_CONSUMER).to(UserRegisteredConsumer).inSingletonScope()