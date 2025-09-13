const appError = require('../utils/appError');
const {ERROR} = require('../utils/httpReqStatus');

module.exports = (...roles) =>{
    return (req, res, next)=>{
        if(!roles.includes(req.currentUser.role)){
            return next(appError.create("You are not allowed to perform this action", 403, ERROR))
        }
        next();
    }
}