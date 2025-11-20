import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from './presentation/routes/routes'
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: process.env.FRONTEND_DOMAIN_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};


app.use(cors(corsOptions));

app.use((req,res,next)=>{
 console.log("req",req.url)
 next()
})


app.use("/api", router);

app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
  }
);

export default app;
