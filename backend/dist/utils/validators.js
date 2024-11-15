import { body } from 'express-validator';
const userNameValidation = () => [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('Username cannot be blank')
        .isLength({ min: 5, max: 20 })
        .withMessage('Username must be between 5 and 20 characters long'),
];
export default userNameValidation;
