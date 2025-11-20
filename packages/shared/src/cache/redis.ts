
import dotenv from "dotenv";
dotenv.config();
import Redis from "ioredis";

const port= Number(process.env.REDIS_PORT)
console.log(port)
export const redis = new Redis({
    host: "localhost",
    port:6379,
});

