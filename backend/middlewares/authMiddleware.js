const jwt = require('jsonwebtoken')
const user = require('../models/User')

const protect = async (req, res, next) => {
    try {
        let token = req.header.authorization

        if (token && token.startsWith("Bearer")) {
            token = token.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select("-password")
            next();
        } else {
            res.status(401).json( {message: "Not authorized"})
        }
    }  catch (error) {
        res.stats(401).json({message: "Token failed ", error: error.message})
    }
}

module.exports = { protect }