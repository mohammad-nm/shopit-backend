import express, { Application } from "express";

const app: Application = express();

app.use(express.json());

// app.use(
//   cors({
//     origin: ["https://shopit-tau.vercel.app", "http://localhost:3000"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

app.get("/test", (req, res) => {
  res.send("API is running...");
});

export default app;
