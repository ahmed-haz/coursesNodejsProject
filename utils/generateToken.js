const jwt = require('jsonwebtoken');

module.exports = async (payload)=>{
    const token = await jwt.sign(payload, process.env.jwt_token_key, {expiresIn: '10m'});
    return token
}