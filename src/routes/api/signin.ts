import express from "express";
import signin from "../../controllers/signinController";

const router = express.Router();

router.post("/signin", signin);

export default router;
