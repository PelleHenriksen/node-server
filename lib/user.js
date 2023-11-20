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

    users.push(body);
    await writeUsers(JSON.stringify(users));

    result = { "status": "ok", "message": "User Updated", "data": body };
  }

  return result;
};

/* Delete User*/
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

/* Update User */

export const updateUser = async (body) => {
  const users = await readUsers();

  let userExists = users.find((user) => user.id === body.id);

  let result = {
    "status": "error",
    "message": "User could not be Updated",
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
