import server from "./lib/server.js";

const app = {};

app.init = () => {
  const port = 3000;

  server.listen(3000, () => {
    console.log("\n------ SERVER ------ \n");
    console.log("http://localhost:" + port);
    console.log("\n------ ****** ------ \n");
  });
};

// Starter Applikation
app.init();
