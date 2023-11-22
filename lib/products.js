import { readProducts } from "./fileHandler.js";

export const getProducts = async () => {
  const products = await readProducts();

  return products;
};
