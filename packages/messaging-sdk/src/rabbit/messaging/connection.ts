import amqplib, { Connection, Channel, ChannelModel } from "amqplib";
// import { log } from "../common/logger";
import { config } from "dotenv";
config()

let connection: ChannelModel | null = null;
let channel: Channel | null = null;

export const RabbitMQ = {
  async connect(RabbitMQUrl:string) {
    if (connection) return { connection, channel };

    connection = await amqplib.connect(RabbitMQUrl);

    connection.on("error", (err) => {
    //   log.error("RabbitMQ Connection Error: " + err);
      connection = null;
    });

    connection.on("close", () => {
    //   log.warn("RabbitMQ Connection Closed");
      connection = null;
    });

    channel = await connection.createChannel();
    // log.info("RabbitMQ Connected");
    console.log("RabbitMQ Connected");

    return { connection, channel };
  },

  getChannel() {
    if (!channel) throw new Error("RabbitMQ channel not initialized");
    return channel;
  }
};
