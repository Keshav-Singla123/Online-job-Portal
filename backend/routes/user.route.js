import express from "express";
import { login, logout, register, updateProfile, getAllUsers } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { authLimiter, apiLimiter } from "../middlewares/rateLimit.js";
 
const router = express.Router();

router.route("/register").post(authLimiter, register);
router.route("/login").post(authLimiter, login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated, apiLimiter, updateProfile);
router.route("/all").get(getAllUsers);

export default router;

