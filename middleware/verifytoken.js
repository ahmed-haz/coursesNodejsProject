const jwt = require('jsonwebtoken');
const {FAIL} = require('../utils/httpReqStatus');

const verifyToken = async(req, res, next) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({Status: FAIL, data:null, msg: "No token provided", code : 401});
    }
    const token = await authHeader.split(' ')[1];
    try{
        const currentUser = jwt.verify(token, process.env.jwt_token_key);
        req.currentUser = currentUser;
        next();
    }catch(err){
        return res.status(403).json({Status: FAIL, data:null, msg: "Invalid token", code : 403});
    }
}

module.exports = verifyToken;