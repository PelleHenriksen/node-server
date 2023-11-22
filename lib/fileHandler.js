import { promises as fs } from "fs";
import { __dirname } from "./helpers.js";
import * as path from "path";

export const readUsers = async () => {
  let result = {};

  result = await fs.readFile(
    path.join(__dirname, "../data/users.json"),
    "utf8",
    (err, data) => {
      return data;
    }
  );

  return JSON.parse(result);
};

export const writeUsers = async (filedata) => {
  console.log("__dirname", __dirname);

  fs.writeFile(path.join(__dirname, "../data/users.json"), filedata, (err) => {
    if (err) {
      return err;
    } else {
      return { status: "ok" };
    }
  });
};

/* Products */

export const readProducts = async () => {
  let result = {};

  result = await fs.readFile(
    path.join(__dirname, "../data/products.json"),
    "utf8",
    (err, data) => {
      return data;
    }
  );

  return JSON.parse(result);
};

export const writeProducts = async (filedata) => {
  console.log("__dirname", __dirname);

  fs.writeFile(
    path.join(__dirname, "../data/products.json"),
    filedata,
    (err) => {
      if (err) {
        return err;
      } else {
        return { status: "ok" };
      }
    }
  );
};
