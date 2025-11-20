
export type ExchangeType = "direct" | "topic" | "fanout";

export interface PublishOptions {
  exchange: string;
  routingKey: string;
  message: any;
  persistent?: boolean;
  type?: ExchangeType;
}

export interface ConsumerOptions {
  exchange: string;
  queue: string;
  routingKey: string;
  prefetch?: number;
  type?: ExchangeType;
  onMessage: (data: any, raw: any) => Promise<void>;
}