import container from ".";

import {CreditProfileConsumer} from "../messaging/consumers/CreditProfileConsumer"
import { DI_TOKENS } from "./types";



container.bind(DI_TOKENS.CONSUMERS.CREDIT_PROFILE_CONSUMER).to(CreditProfileConsumer).inSingletonScope();
