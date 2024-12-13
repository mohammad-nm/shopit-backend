// import dotenv from "dotenv";
// import connectDB from "./config/db";
// import app from "./app";
// import signinController from "./controllers/signinController";
// import signupController from "./controllers/signupController";
// import getProducts, {
//   getProductById,
//   getProductsByIds,
// } from "./controllers/productsController";
// import cartUpdate from "./controllers/cartUpdate";
// import cors from "cors";

// app.use(
//   cors({
//     origin: "https://shopit-tau.vercel.app",
//     methods: "GET,POST",
//     allowedHeaders: "Content-Type,Authorization",
//   })
// );
// dotenv.config();

// const PORT = process.env.PORT || 3000;

// connectDB();

// // app.use("/api", signin);
// // app.use("/api", signup);
// app.get("/api/test", (req, res) => {
//   res.send("API is running...");
// });
// app.post("/api/signin", signinController);
// app.post("/api/signup", signupController);
// app.post("/api/products", getProducts);
// app.post("/api/product", getProductById);
// app.post("/api/cart", cartUpdate);
// app.post("/api/products/ids", getProductsByIds);
// // app.listen(PORT, () => {
// //   console.log(`Server is running on port ${PORT}`);
// // });
// export default app;
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import signinController from "./controllers/signinController";
import signupController from "./controllers/signupController";
import getProducts, {
  getProductById,
  getProductsByIds,
} from "./controllers/productsController";
import cartUpdate from "./controllers/cartUpdate";

dotenv.config();

const app = express();

// Enable CORS for your frontend (Vercel URL)
app.use(
  cors({
    origin: "https://shopit-tau.vercel.app", // Your frontend URL
    methods: "GET,POST",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(express.json()); // Parse incoming JSON requests

// Connect to MongoDB
connectDB();

// Define API routes
app.get("/api/test", (req, res) => {
  res.send("API is running...");
});
app.post("/api/signin", signinController);
app.post("/api/signup", signupController);
app.post("/api/products", getProducts);
app.post("/api/product", getProductById);
app.post("/api/cart", cartUpdate);
app.post("/api/products/ids", getProductsByIds);

// Export the app to be handled by Vercel
export default app;
