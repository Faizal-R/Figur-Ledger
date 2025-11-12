import "reflect-metadata";
import "./di/inversify.config";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./presentation/routes/routes";

dotenv.config();
const app = express();
const port = process.env.PORT

app.use(cors());
app.use(express.json());
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Hello Worldsssdfsdfsdfsklasjdlfkjslk;djflk;sjdlf;kjslkdjflksjdlfkjslkdfjlksdjlkfjlskdjklfj!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
