// import { RabbitMQ } from "./connection";
// import { ConsumerOptions } from "./types";
// // import { log } from "../common/logger";
// import { safeJsonParse } from "../common/utils";

import { RabbitMQ } from "./connection";

// export const RabbitConsumer = {
//   async subscribe({ exchange, queue, routingKey, prefetch = 1, type = "direct", onMessage }: ConsumerOptions) {
//     const channel = RabbitMQ.getChannel();

//     await channel.assertExchange(exchange, type, { durable: true });

//     await channel.assertQueue(queue, {
//       durable: true,
//       deadLetterExchange: `${exchange}.dlx`
//     });

//     await channel.bindQueue(queue, exchange, routingKey);

//     channel.prefetch(prefetch);

//     // log.info(`RabbitMQ Consumer Ready → queue: ${queue}`);
//     console.log( `RabbitMQ Consumer Ready → queue: ${queue}`  )

//     channel.consume(queue, async (msg) => {
//       if (!msg) return;

//       const parsed = safeJsonParse(msg.content.toString());

//       if (!parsed) {
//         // log.error("Invalid JSON received");
//         console.log("Invalid JSON received");
//         channel.nack(msg, false, false);
//         return;
//       }

//       try {
//         await onMessage(parsed, msg);
//         channel.ack(msg);
//       } catch (err) {
//         // log.error("Consumer error: " + err);
//         console.log("Consumer error: " + err);
//         channel.nack(msg, false, false);
//       }
//     });
//   }
// }





export const RabbitConsumer = async (queue: string,onMessage:(message:string)=>void) => {
    const  channel = RabbitMQ.getChannel()
    await channel.assertQueue(queue, { durable: true });
    console.log(`Waiting for messages in ${queue}...`);

    channel.consume(queue,async (message) => {
        if (message) {
            console.log(`Received: ${message.content.toString()}`);
            const messsageData=message.content.toString()
            await onMessage(messsageData)
            console.log("message Sended")
            channel.ack(message); // Acknowledge message
            console.log("message Acknowledged")
            
        }
    });
};

