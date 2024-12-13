import dotenv from "dotenv";
import connectDB from "./config/db";
import app from "./app";
import signinController from "./controllers/signinController";
import signupController from "./controllers/signupController";
import getProducts, {
  getProductById,
  getProductsByIds,
} from "./controllers/productsController";
import cartUpdate from "./controllers/cartUpdate";

// import { getProductById } from "./controllers/productsController";
dotenv.config();

const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// app.use("/api", signin);
// app.use("/api", signup);

app.post("/api/signin", signinController);
app.post("/api/signup", signupController);
app.post("/api/products", getProducts);
app.post("/api/product", getProductById);
app.post("/api/cart", cartUpdate);
app.post("/api/products/ids", getProductsByIds);
