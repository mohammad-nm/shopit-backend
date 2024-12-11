import dotenv from "dotenv";
import connectDB from "./config/db";
import app from "./app";
import signin from "./routes/api/signin";
import signup from "./routes/api/signup";
import signinController from "./controllers/signinController";
import signupController from "./controllers/signupController";
import getProducts from "./controllers/productsController";
// import { getProductById } from "./controllers/productsController";
dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// app.use("/api", signin);
// app.use("/api", signup);

app.post("/api/signin", signinController);
app.post("/api/signup", signupController);
app.post("/api/products", getProducts);
// app.get("/api/product/:id", getProductById);
