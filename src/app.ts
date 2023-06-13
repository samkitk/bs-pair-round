import express, { Response } from "express";
import { Request } from "express";
import { requestLogger } from "./middleware/requestLogger";
import { urlRouter } from "./routes/router1";

const app = express();

app.use(express.json());
app.use(requestLogger);

app.get("/", async (req: Request, res: Response) => {
  await res.status(200).json({ message: "Hello World!" });
});

app.use("/url", urlRouter);

app.listen(3000, () => {
  console.log("App is running on port 3000");
});
