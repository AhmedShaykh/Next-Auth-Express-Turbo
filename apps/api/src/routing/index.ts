import AuthRoutes from "./authRoutes.js";
import ClashRoutes from "./clashRoutes.js";
import { Router } from "express";

const router = Router();

router.use("/api", AuthRoutes);

router.use("/api/clash", ClashRoutes);

export default router;