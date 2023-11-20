import { readUsers } from "./fileHandler.js";

export const getUsers = async () => {
  const users = await readUsers();

  return users;
};
