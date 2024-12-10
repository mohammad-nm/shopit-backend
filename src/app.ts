import express, { Application } from "express";

const app: Application = express();

app.use(express.json());

app.get("/test", (req, res) => {
  res.send("API is running...");
});

export default app;
