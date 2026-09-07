import { body } from 'express-validator';
import { AvailableTaskStatuses, AvailableUserRoles, } from "../constants/constants.js"

const userRegistrationValidator = () => {
    return [
        body('email')
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage('Email is invalid'),
        body('username')
            .trim()
            .notEmpty()
            .withMessage("Username is required")
            .isLength({ min: 3 })
            .withMessage("Username should be at least 3 char")
            .isLength({ max: 13 })
            .withMessage("Username cannot exceed 13 char"),
        body('password')
            .notEmpty().withMessage("Password is required")
            .isLength({ min: 6 }).withMessage("Password must be at least 6 chars"),
    ];
};

const userLoginValidator = () => {
    return [
        body('email').optional().isEmail().withMessage("Email is not valid"),
        body('username').optional().trim().isLength({ min: 3 }).withMessage('Username must be atleast 3 char'),
        body('password').notEmpty().withMessage("Password cannot be empty"),
    ];
};

const userChangeCurrentPasswordValidator = () => {
    return [
        body("oldPassword").notEmpty().withMessage("old password is required"),
        body("newPassword").notEmpty().withMessage("New password is required"),
    ];
};

const userForgotPasswordValidator = () => {
    return [
        body("email")
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Email is invalid"),
    ];
};

const userResetForgottenPasswordValidator = () =>{
    return [body("newPassword").notEmpty().withMessage("Password is required")];
}

const createProjectValidator = () => {
    return [
        body('name').notEmpty().withMessage("name is required"),
        body("description").optional(),
    ];
};

const addMemberToProjectValidator = () =>{
    return [
        body('email')
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email is invalid"),
        body("role")
        .notEmpty()
        .withMessage("Role is required")
        .isIn(AvailableUserRoles)
        .withMessage("Role is invalid"),
    ];
};

const createTaskValidator = () => {
    return [
        body("title").notEmpty().withMessage("Title required"),
        body("description").optional(),
        body("assignedTo").notEmpty().withMessage("Assigned to is required"),
        body("status").optional().notEmpty().withMessage("Status is required").isIn(AvailableTaskStatuses),
    ];
};

const updateTaskValidator = () =>{
    return [
        body("title").optional(),
        body('description').optional(),
        body("status").optional().isIn(AvailableTaskStatuses).withMessage("Status is invalid"),
        body("assignedTo").optional(),
    ];
};

const notesValidator = () => {
    return [body('content').notEmpty().withMessage("content is required")];
};

export {
    userRegistrationValidator,
    userLoginValidator,
    userChangeCurrentPasswordValidator,
    userForgotPasswordValidator,
    userResetForgottenPasswordValidator,
    createProjectValidator,
    addMemberToProjectValidator,
    createTaskValidator,
    updateTaskValidator,
    notesValidator,
};