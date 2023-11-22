import { readUsers, writeUsers } from "./fileHandler.js";
import crypto from "crypto";

/* Create User */
export const createUser = async (body) => {
  const users = await readUsers();
  const userExists = users.find((user) => user.email === body.email);

  let result = {
    "status": "error",
    "message": "User could not be created",
    "data": null,
  };

  if (!userExists) {
    body.id = crypto.randomBytes(16).toString("hex");
    body.profile = "";

    users.push(body);
    await writeUsers(JSON.stringify(users));

    result = { "status": "ok", "message": "User Created", "data": body };
  }

  return result;
};

/* Delete Ueser */
export const deleteUser = async (id) => {
  const users = await readUsers();

  let userIndex = users.findIndex((user) => user.id === id);

  let result = {
    "status": "error",
    "message": "User could not be deleted",
    "data": null,
  };

  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    await writeUsers(JSON.stringify(users));

    result = { "status": "ok", "message": "User Deleted", "data": users };
  }

  return result;
};

export const getUser = async (id) => {
  let result = {
    "status": "error",
    "message": "User could not be found",
    "data": null,
  };

  console.log("getUser", id);
  const users = await readUsers();
  let user = users.find((user) => user.id === id);

  if (user) {
    result = { "status": "ok", "message": "User Found", "data": user };
  }

  return result;
};

/* Update User */
export const updateUser = async (body) => {
  const users = await readUsers();
  let userExists = users.find((user) => user.id === body.id);

  let result = {
    "status": "error",
    "message": "User could not be updated",
    "data": null,
  };

  if (userExists) {
    let userIndex = users.findIndex((user) => user.id === body.id);

    let updatedUser = {
      ...userExists,
      ...body,
    };

    users[userIndex] = updatedUser;
    await writeUsers(JSON.stringify(users));

    result = { "status": "ok", "message": "User Updated", "data": users };
  }

  return result;
};
