import { Router } from "express";
import { asyncHandler } from "../../utils/errorHandler/asyncHandler.js";
import * as messageService from "./messages.service.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js";
import { userRoles } from "../../DB/modules/user.model.js";
import { auth } from "../../middleware/auth.middleware.js";
import isValidationMessages, { validateRegister } from "../../middleware/validation.middleware.js";
import { sendMessageSchema, getAllMessagesSchema } from "./messages.validation.js";
const router = Router();


//  // create a message 
router.post("/", auth, isAuthorized([userRoles.user]), validateRegister(sendMessageSchema), asyncHandler(messageService.sendMessage));



// get single message 
router.get("/:messageId", auth, isAuthorized([userRoles.user, userRoles.admin]), asyncHandler(messageService.getSingleMessage), isValidationMessages);

// get all messages
router.get(
	"/",
	auth,
	isAuthorized([userRoles.user]),
	validateRegister(getAllMessagesSchema),
	asyncHandler(messageService.getAllMessages)
);

 // update a message 
 router.patch("/:messageId", auth, isAuthorized([userRoles.user]), asyncHandler(messageService.updateMessage));

// delete a message 
router.delete("/:messageId", auth, isAuthorized([userRoles.admin]), asyncHandler(messageService.deleteMessage));

export default router;