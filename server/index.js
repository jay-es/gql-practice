const express = require("express");
const apolloServer = require("./todos");

const app = express();
apolloServer.applyMiddleware({ app });

app.listen(4000, () => {
  console.log("Listening on 4000");
});
