import express from "express";
import { getUsers } from "./users.js";
import { getProducts } from "./products.js";
import {
  createProducts,
  deleteProduct,
  getProduct,
  updateProduct,
} from "./product.js";

import { createUser, deleteUser, updateUser, getUser } from "./user.js";
import cors from "cors";
import { upload } from "./uploadHandler.js";

const server = express();
server.use(express.json());
server.use(cors());
server.use(express.static("uploads"));

server.get("/", (req, res) => {
  res.send("Hello World");
});

/* User */
server.get("/user", (req, res) => {
  console.log(req.query.id);

  getUser(req.query.id).then((result) => {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200);
    res.send(result);
  });
});
/* create user */
server.post("/user", (req, res) => {
  createUser(req.body).then((result) => {
    console.log("Result", result);

    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200);
    res.send(result);
  });
});

server.post("/user/profile", upload.single("profile"), (req, res) => {
  let userObj = {
    "id": req.body.id,
    "profile": req.body.id + ".jpg",
  };

  updateUser(userObj).then(() => {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200);
    res.send({
      "status": "ok",
      "message": "User profile image updated",
      "data": req.body,
    });
  });
});

server.delete("/user", (req, res) => {
  console.log("ID", req.query.id);

  deleteUser(req.query.id).then((result) => {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200);
    res.send(result);
  });
});

server.put("/user", (req, res) => {
  updateUser(req.body).then((result) => {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200);
    res.send(result);
  });
});

/* Users */
server.get("/users", (req, res) => {
  getUsers().then((result) => {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200);
    res.send(result);
  });
});

/* Product create */
server.post("/product", (req, res) => {
  createProducts(req.body).then((result) => {
    console.log("result", result);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200);
    res.send(result);
  });
});
export default server;

/* delete update */

server.delete("/product", (req, res) => {
  console.log("ID", req.query.id);

  deleteProduct(req.query.id).then((result) => {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200);
    res.send(result);
  });
});

/* update product */

server.put("/product", (req, res) => {
  updateProduct(req.body).then((result) => {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200);
    res.send(result);
  });
});

/* products */
server.get("/products", (req, res) => {
  getProducts().then((result) => {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200);
    res.send(result);
  });
});

/* product */
server.get("/product", (req, res) => {
  console.log(req.query.id);

  getProduct(req.query.id).then((result) => {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200);
    res.send(result);
  });
});
