import {body} from 'express-validator'
const userRegistrationValidator = ()=>{
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
        .isLength({min:3})
        .withMessage("Username should be at least 3 char")
        .isLength({max:13})
        .withMessage("Username cannot exceed 13 char"),
        body('password') 
            .notEmpty().withMessage("Password is required")
            .isLength({ min: 6 }).withMessage("Password must be at least 6 chars"),
    ];
};

const userLoginValidator = () =>{
    return [
        body('email').optional().isEmail().withMessage("Email is not valid"),
        body('username').optional().trim().isLength({min:3}).withMessage('Username must be atleast 3 char'),
        body('password').notEmpty().withMessage("Password cannot be empty"),
    ];
};

export {userRegistrationValidator, userLoginValidator};