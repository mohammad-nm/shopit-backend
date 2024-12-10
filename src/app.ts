import express, { Application } from "express";
import cors from "cors";

const app: Application = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/test", (req, res) => {
  res.send("API is running...");
});

export default app;
