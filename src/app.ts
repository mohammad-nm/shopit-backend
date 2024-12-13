import express, { Application } from "express";
import cors from "cors";

const app: Application = express();

app.use(express.json());

app.use(
  cors({
    origin: "https://shopit-backend-one.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/test", (req, res) => {
  res.send("API is running...");
});

export default app;
