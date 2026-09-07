import { Router } from "express";
import {validateProjectPermission, verifyJWT,} from "../middlewares/auth.middlewares.js";
import { validate } from "../middlewares/validator.middlewares.js"
import { AvailableUserRoles, UserRolesEnum } from "../constants/constants.js"
import { addMemberToProjectValidator, createProjectValidator, } from "../validators/index.validators.js"
import { addMemberToProject, deleteProject, getProjectById, getProjectMembers, updateMemberRole, updateProject } from "../controllers/project.controllers.js";
import { validationResult } from "express-validator";

const router = Router();
router.use(verifyJWT);
router.route("/").get(getProjects).post(createProjectValidator(), validate, createProject)
router.route(":/projectId").get(validateProjectPermission(AvailableUserRoles), getProjectById).put(validateProjectPermission([UserRolesEnum.ADMIN]),createProjectValidator(), validate, updateProject,)
.delete(validationProjectPermission([UserRolesEnum.ADMIN]),deleteProject)
router.route("/:projectId/members").get(validateProjectPermission(AvailableUserRoles),getProjectMembers)
.post(validateProjectPermission([UserRolesEnum.ADMIN]),addMemberToProjectValidator(), validate, addMemberToProject,);
router.route("/:projectId/members/:userId").put(validateProjectPermission([UserRolesEnum.ADMIN]),updateMemberRole).delete(validateProjectPermission([UserRolesEnum.ADMIN]),deleteProject);

export default router;