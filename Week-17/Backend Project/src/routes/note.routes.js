import { Router } from "express";
import {verifyJwt, getLoggedInUserOrIgnore, validateProjectPermission} from "../middlewares/auth.middlewares.js"
import { AvailableUserRoles, AvailableTaskStatus, UserRolesEnum } from "../constants/constants.js";
import {validate} from "../middlewares/validator.middlewares.js"
import {notesValidator} from "../validators/index.validators.js"
import {getNotes, getNotesById, createNotes,updateNotes, deleteNotes} from "../controllers/note.controllers.js"

const router = Router();

router.route("/:ProjectId")
.get(validateProjectPermission(AvailableUserRoles),getNotes)
.post(validateProjectPermission([UserRolesEnum.ADMIN]),notesValidator(),validate, createNotes);

router.route("/:ProjectId/n/:noteId")
.get(validateProjectPermission(AvailableUserRoles), getNotesById)
.put(validateProjectPermission([UserRolesEnum.ADMIN]),notesValidator(), validate, updateNotes)
.delete(validateProjectPermission([UserRolesEnum.ADMIN]),deleteNotes)

export default router;