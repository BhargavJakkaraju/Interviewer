const User = ('../models.User')
const bcrypt = requre('bcrypt.js')
const jwt = requre('jsonwebtoken')

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d"});
};