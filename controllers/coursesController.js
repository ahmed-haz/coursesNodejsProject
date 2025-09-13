
const Course = require('../models/courseModel');
const {SUCCESS, ERROR, FAIL} = require('../utils/httpReqStatus');
const asyncWrapper = require('../middleware/asyncWrapper');
const appError = require('../utils/appError');

const getAllCourses = asyncWrapper(async (req, res, next) => {
    // Logic to get all courses
    const query = req.query;
    const limit = parseInt(query.limit) || 10; // Default limit to 10 if not provided
    const page = parseInt(query.page) || 1; // Default page to 1 if not provided
    const skip = (page - 1) * limit;
    const Courses = await Course.find({}, {__v : 0}).limit(limit).skip(skip); // Exclude __v field
    res.status(200).json({Status: SUCCESS, data:{Courses}});
})

const getCourseById = asyncWrapper(async (req, res, next) => {
    const courseID = req.params.id;
    const course = await Course.findById(courseID);  
    if(!course){
        const error = appError.create("Course not found", 404, FAIL);
        return next(error);
    }
    else {
         return res.status(200).json({Status: SUCCESS, data:{course}});
    }
})

const createCourse = asyncWrapper(async (req, res, next) => {
    let course = req.body;
    await Course.insertOne(course);
    res.status(201).json({Status: SUCCESS, data:{course}});
})

const updateCourse = asyncWrapper(async (req, res, next) => {
    const coursID = req.params.id;
    let course = await Course.findById(coursID);
    if(!course){
        const err = appError.create("Course not found", 404, FAIL)
        return next(err);
    }
    course = await Course.updateOne({_id: coursID}, {$set: req.body});
    return res.status(200).json({Status: SUCCESS, data:{info: course}});
})


const deleteCourse = asyncWrapper(async (req, res, next) => {
    courseID = req.params.id;
    if(!await Course.findById(courseID)){
        const err = appError.create("Course not found", 404, FAIL)
        return next(err);
    }
    const deletedCourse = await Course.deleteOne({_id: courseID});
    return res.status(200).json({Status: SUCCESS, data:{info: deletedCourse}});
})

module.exports = {
    getAllCourses,
    getCourseById,  
    createCourse,
    updateCourse,
    deleteCourse
}