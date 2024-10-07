import express from "express";
import { apiRouter } from "./api/apiRouter.js";
import { dictionaryRouter } from "./api/dictionaryRouter.js";
import { scheduleRouter } from "./api/scheduleRouter.js";
const app = express();
const port = 5114;

app.use(
  express.json({
    type: "application/json",
  })
);
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/api", apiRouter);
app.use("/api/dictionary", dictionaryRouter);
app.use("/api/schedule", scheduleRouter);

app.get("/", (req, res) => {
  return res.send("Home page");
});

app.use("/", (req, res, next) => {
  return res.status(404).send("Sorry cant find that");
});

app.use("/", (req, res, next) => {
  console.error(err.stack);
  return res.status(505).send("Something broke");
});

app.listen(5114, () => {
  console.log("SERVER: http://localhost:" + port);
});
