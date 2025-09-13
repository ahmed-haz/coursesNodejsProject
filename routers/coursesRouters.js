const express = require('express');
const {body} = require('express-validator');
const verifyToken = require('../middleware/verifytoken')
const router = express.Router();
let {getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse} = require('../controllers/coursesController');
const allowedTo = require('../middleware/allowedTo');
const roles = require('../utils/userRoles');

// const validateCourse = require('../middleware/validator');

// router.get('/', getAllCourses);
// router.get('/:id', getCourseById);
// router.post('/', createCourse);
// router.patch('/:id', updateCourse);
// router.delete('/:id', deleteCourse);

router.route('/')
    .get(verifyToken, getAllCourses)
    .post(verifyToken, allowedTo(roles.ADMIN, roles.MANAGER), createCourse);

router.route('/:id')
    .get(getCourseById)
    .patch(updateCourse)
    .delete(verifyToken, allowedTo(roles.ADMIN, roles.MANAGER), deleteCourse);
module.exports = router;
