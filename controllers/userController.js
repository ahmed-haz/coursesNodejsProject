const User = require('../models/userModel');
const {SUCCESS, ERROR, FAIL} = require('../utils/httpReqStatus');
const bcrypt = require('bcryptjs');
const getToken = require('../utils/generateToken');
const generateToken = require('../utils/generateToken');
const appError = require('../utils/appError');
const asyncWrapper = require('../middleware/asyncWrapper');

const getAllUsers = asyncWrapper(async(req, res, next)=>{
    const users = await User.find({},{__v : 0, password: 0});
    res.status(200).json({Status: SUCCESS, data:{users}});
})

const register = asyncWrapper(async(req, res, next)=>{
    const {firstName, lastName, email, password, role} = req.body;
    if(!firstName || !lastName || !email || !password){
        const err = appError.create("All fields are required", 400, FAIL);
        return next(err);
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    
    let user = new User({firstName, lastName, email, password: hashedpassword, role,  avatar: req.file.filename});
    const token = await generateToken({email: email, id: user._id, role: user.role});
    user.token = token;
    await user.save();
    res.status(201).json({Status: SUCCESS, data:{user}});
})

const login = asyncWrapper(async(req, res, next)=>{
    const {email, password} = req.body;
    if(!email || !password){
        const err = appError.create("All fields are required", 400, FAIL);
        return next(err);
    }
    const user = await User.findOne({email: email}, {__v:0});
    if(!user){
        const err = appError.create("Invalid email", 401, FAIL);
        return next(err);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        const err = appError.create("Invalid password", 401, FAIL);
        return next(err);
    }
    const token = await generateToken({email: user.email, id: user._id, role: user.role});
    user.token = token;
    await user.save();
    res.status(200).json({Status: SUCCESS, data:{user: user}, msg: "Logged in successful"});
})

module.exports = {
    getAllUsers,
    register,
    login
};