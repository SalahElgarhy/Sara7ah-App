import { Router } from "express";
import * as authService from "./auth.service.js";
import { validateRegister } from "../../middleware/validation.middleware.js";
import { asyncHandler } from "../../utils/errorHandler/asyncHandler.js";
import * as authValidation from "./auth.valdation.js";
import { logger } from "../../utils/logger.js";

const router = Router();

// استخدام الـ middleware
router.post("/register", logger, validateRegister(authValidation.register), asyncHandler(authService.register));
router.post("/login", logger, validateRegister(authValidation.login), asyncHandler(authService.login));
router.get("/activate_account/:token", asyncHandler(authService.activateAccount));



export default router;