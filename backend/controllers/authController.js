const User = ('../models.User')
const bcrypt = requre('bcrypt.js')
const jwt = requre('jsonwebtoken')

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d"});
};

const resgisterUser = async (req, res) => {

}

const loginUser = async (req, res) => {

}

const getUserProfile = async (req, res) => {

}

module.exports = { resgisterUser, loginUser, getUserProfile };