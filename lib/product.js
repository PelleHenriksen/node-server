import { readProducts, writeProducts } from "./fileHandler.js";
import crypto from "crypto";

/* Create Products */

export const createProducts = async (body) => {
  const products = await readProducts();
  const productExists = products.find((product) => product.name === body.name);

  let result = {
    "status": "error",
    "message": "Product could not be created",
    "data": null,
  };

  if (!productExists) {
    body.id = crypto.randomBytes(16).toString("hex");

    products.push(body);
    writeProducts(JSON.stringify(products));

    result = { "status": "ok", "message": "Product Created", "data": body };
  }
  return result;
};

/* get product */

export const getProduct = async (id) => {
  let result = {
    "status": "error",
    "message": "Product could not be found",
    "data": null,
  };

  console.log("getProduct", id);
  const products = await readProducts();
  let product = products.find((product) => product.id === id);

  if (product) {
    result = { "status": "ok", "message": "Product Found", "data": product };
  }

  return result;
};

/* delete product */

export const deleteProduct = async (id) => {
  const products = await readProducts();

  let productIndex = products.findIndex((product) => product.id === id);

  let result = {
    "status": "error",
    "message": "product could not be deleted",
    "data": null,
  };

  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    await writeProducts(JSON.stringify(productIndex));

    result = { "status": "ok", "message": "Product Deleted", "data": products };
  }

  return result;
};

/* Update Product */

export const updateProduct = async (body) => {
  const product = await readProducts();
  let productExists = product.find((product) => product.id === body.id);

  let result = {
    "status": "error",
    "message": "Product could not be updated",
    "data": null,
  };

  if (productExists) {
    let productIndex = product.findIndex((product) => product.id === body.id);

    let updatedProduct = {
      ...productExists,
      ...body,
    };

    product[productIndex] = updatedProduct;
    await writeProducts(JSON.stringify(product));

    result = {
      "status": "ok",
      "message": "Product Updated",
      "data": product,
    };
  }

  return result;
};
