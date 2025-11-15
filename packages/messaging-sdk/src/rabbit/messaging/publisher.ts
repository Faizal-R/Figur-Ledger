import { RabbitMQ } from "./connection";
import { PublishOptions } from "../types";
// import { log } from "../common/logger";

// export const RabbitPublisher = {
//   async publish({ exchange, routingKey, message, persistent = true, type = "direct" }: PublishOptions) {
//     const channel = RabbitMQ.getChannel();

//     await channel.assertExchange(exchange, type, { durable: true });

//     const buffer = Buffer.from(JSON.stringify(message));

//     channel.publish(exchange, routingKey, buffer, { persistent });

//     // log.info(`RabbitMQ Published → ${exchange}:${routingKey}`);
//     console.log(`RabbitMQ Published → ${exchange}:${routingKey}`)
//   },
// };


export const RabbitPublisher= async (queue: string, message: string) => {
    const channel=  RabbitMQ.getChannel();
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(message));
    console.log(`Message sent to ${queue}:`, message);
};
