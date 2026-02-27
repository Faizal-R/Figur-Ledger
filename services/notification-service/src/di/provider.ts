import container  from ".";

import { INotificationProvider
 } from "../domain/interfaces/services/INotificationProvider";
 import { NotificationProvider } from "../infra/providers/NotificationProvider";
import { DI_TOKENS } from "./types";




 container.bind<INotificationProvider>(DI_TOKENS.PROVIDERS.NOTIFICATION_PROVIDER).to(NotificationProvider).inSingletonScope()