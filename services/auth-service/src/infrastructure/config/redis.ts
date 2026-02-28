import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
});

// const redis=new Redis(process.env.REDIS_URL!);
redis.on("connect", () => {
  console.log("🔌 Connected to Redis");
});

redis.on("error", (err) => {
  console.error("❌ Redis Error:", err);
});

export  {redis};
