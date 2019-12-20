import express from "express";
import apolloServer from "./todos";

const app = express();
apolloServer.applyMiddleware({ app });

app.listen(4000, () => {
  console.log("Listening on 4000");
});
