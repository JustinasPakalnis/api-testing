import express from "express";

export const apiRouter = express();
apiRouter.get("/", (req, res) => {
  return res.status(501).send("API: not implemented");
});
