const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('./config')


const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (authHeader != null && !authHeader.startsWith('Bearer ')) {
            return res.status(403).json({}) 
        }
    
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded != null && decoded.userId) {
            req.userId = decoded.userId;
            console.log(req.userId);
            next();
        }
    } catch (err) {
        return res.status(403).json({}) 
    }

}

module.exports = {
    authMiddleware
}