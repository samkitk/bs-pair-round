import express, { Router, Request, Response } from "express";
import { prisma } from "../helpers/prisma";
import { addURL, shortToLongRedirect } from "../urlshortner";

export const urlRouter: Router = express.Router();

urlRouter.get("/:shortUrl", async (req: Request, res: Response) => {
  let shortUrl = req.params.shortUrl;
  let longUrl = await shortToLongRedirect(shortUrl);
  if (longUrl) {
    return res.redirect(longUrl);
  } else {
    return res.status(400).json({ message: "Short Url Not Found" });
  }
});

urlRouter.post("/", async (req: Request, res: Response) => {
  let { longUrl } = req.body;
  console.log("Req", longUrl);

  if (!longUrl) {
    return res.status(400).json({ message: "Missing the Long Url" });
  }

  let shortUrl = await addURL(longUrl);

  if (shortUrl) {
    return res.status(200).json({ shortUrl: shortUrl });
  }
});
