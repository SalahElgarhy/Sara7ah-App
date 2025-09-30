import { Router } from "express";
import * as userService from "./user.service.js";
import { auth } from "../../middleware/auth.middleware.js";
import { asyncHandler } from "../../utils/errorHandler/asyncHandler.js";
import { userRoles } from "../../DB/modules/user.model.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js";
import * as userValidation from "./user.validation.js";
import { validateRegister } from "../../middleware/validation.middleware.js";

const router = Router();


router.get("/profile", auth, isAuthorized([userRoles.user]), asyncHandler(userService.profile));

// update profile
router.patch(
  "/profile",

  auth,

  isAuthorized([userRoles.user, userRoles.admin]),

  validateRegister(userValidation.updateProfile), // ✅ validate body

  asyncHandler(userService.updateProfile)
);

// change password
router.patch(
  "/change-password",
  auth,
  isAuthorized([userRoles.user, userRoles.admin]),
  validateRegister(userValidation.changePassword),
  asyncHandler(userService.changePassword)
);
// delete account
router.delete(
  "/delete-account",
  auth,
  isAuthorized([userRoles.user, userRoles.admin]),
  asyncHandler(userService.deleteAccount)
);
export default router;