const User = require("../models/User")

exports.createUser = async (req, res, next) =>{
    const { username, email, role } = req.body;

    const password = "defaultPass"

    try {
        const user = await User.create({
            username, email, password, role
        });
        sendToken(user, 201, res);

    } catch (error) {
        next(error);
    }
}

exports.updateUser = async (req, res, next) =>{
    const { _id, username, email, role } = req.body;

    try {
        const user = await User.updateOne(
            {_id},
            {username, email, role}
        );
        res.status(200).json({success: true, data: user})

    } catch (error) {
        next(error);
    }
}

exports.deleteUser = async (req, res, next) => {
    const { userID } = req.params
    try {
        const deletedUser = await User.findByIdAndDelete(userID)

        res.status(200).json({success: true, data: deletedUser})
    } catch (error) {
        next(error)
    }
}

const sendToken = (user, statusCode, res) =>{
    const token = user.getSignedToken();
    res.status(statusCode).json({ success: true, token})
}