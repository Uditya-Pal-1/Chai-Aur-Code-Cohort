import { Router } from "express";
import {
    validateProjectPermission,
    verifyJWT
} from "../middlewares/auth.middlewares.js"
import {
    createSubTask,
    createTask,
    deleteSubTask,
    deleteTask,
    getTaskById,
    getTasks,
    updateSubTask,
    updateTask,
} from '../controllers/task.controllers.js'
import { upload } from '../middlewares/multer.middlewares.js'
import { validate } from '../middlewares/validator.middlewares.js'
import {
    AvailableUserRoles,
    UserRolesEnum
} from "../constants/constants.js";
import {
    createtaskValidator,
    updateTaskValidator,
} from '../validators/index.validators.js'

const router = Router();
router.use(verifyJWT);
router.route("/:projecId")
.get(validateProjectPermission(AvailableUserRoles), getTasks)
.post(validateProjectPermission([UserRolesEnum.ADMIN,UserRolesEnum.PROJECT_ADMIN,]),
upload.array("attachments"),
createtaskValidator(),
validate,
createTask,
);
router.route("/projectId/t/:taskId")
.get(validateProjectPermission(AvailableUserRoles),getTaskById)
.put(validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]),
upload.array("attachments"),
updateTaskValidator(),
validate,
updateTask,
)
.delete(
    validateProjectPermission([UserRolesEnum.ADMIN,UserRolesEnum.PROJECT_ADMIN,]),
    deleteTask,
);
router.route("/:projectId/t/:taskId/subTasks")
post(validateProjectPermission([UserRolesEnum.ADMIN,UserRolesEnum.PROJECT_ADMIN,]),
createSubTask,
);
router.route("/:projectId/st/subTaskId").put(validateProjectPermission(AvailableUserRoles),updateSubTask)
.delete(validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN,]),
deleteSubTask,
);


export default router;