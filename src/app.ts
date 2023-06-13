import express, { Response } from "express";
import { Request } from "express";
import { requestLogger } from "./middleware/requestLogger";

const app = express();

app.use(express.json());
app.use(requestLogger);

app.get("/", async (req: Request, res: Response) => {
  await res.status(200).json({ message: "Hello World!" });
});

app.get("/t", async (req: Request, res: Response) => {
  let response = await fn1(["hi", "myy", "asfafs", "a", ""]);
  console.log("SENT");
  return res.status(200).json({ message: response });
});

app.listen(3000, () => {
  console.log("App is running on port 3000");
});

async function fn1(arr: string[]) {
  const newArr = arr.map((element) =>
    element.length > 2 ? element.length * 2 : 0
  );
  console.log("R1");
  return newArr;
}
