const { body, validationResult } = require('express-validator');
const validateCourse = ()=>{
    return [
        body('title').notEmpty().withMessage('Title is required'),
        body('price').notEmpty().withMessage('price is required'),
        ]
}


module.exports = {
    validateCourse
}