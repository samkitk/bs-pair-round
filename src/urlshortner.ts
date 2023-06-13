import { check } from "express-validator";
import { prisma } from "./helpers/prisma";
import randomstring from "randomstring";

export async function addURL(longUrl: string) {
  // let randomStringOnly = await createRandomString();

  let randomStringOnly = "XitOJiDagrwh";

  console.log("randomstringt", randomStringOnly);

  let shortUrl = await retryCreationOfShortUrl(randomStringOnly, 5);

  console.log("shorturl final", shortUrl);

  if (shortUrl) {
    let data = {
      short: shortUrl,
      long: longUrl,
    };

    let row = await prisma.uRLShortner.create({ data });

    return row.short;
  } else {
    return null;
  }
}

async function createRandomString() {
  let randString = await randomstring.generate({
    length: 12,
    charset: "alphabetic",
  });
  return randString as string;
}

async function checkIfShortUrlExists(shortUrl: string) {
  let row = await prisma.uRLShortner.findUnique({
    where: {
      short: shortUrl,
    },
  });

  console.log("Check if Short exists", row);

  if (row) {
    return true;
  } else {
    return false;
  }
}

async function retryCreationOfShortUrl(shortUrl: string, numberOfAttempts: 5) {
  let check = await checkIfShortUrlExists(shortUrl);
  let newShortUrl = null;
  console.log("Check", check);
  if (check) {
    while (numberOfAttempts--) {
      newShortUrl = await createRandomString();
      console.log("newshortUrl attempt", newShortUrl, numberOfAttempts);

      if (!(await checkIfShortUrlExists(newShortUrl))) {
        return newShortUrl;
      }
    }
    return null;
  }
  return shortUrl;
}

export async function shortToLongRedirect(shortUrl: string) {
  let longUrl = await prisma.uRLShortner.findUnique({
    where: {
      short: shortUrl,
    },
  });

  if (longUrl) {
    return longUrl.long as string;
  }
  return null;
}
