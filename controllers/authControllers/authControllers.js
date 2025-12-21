const { sendErrorResponse } = require("../../helpers/errorHandlers/errorHandlers");
const User = require("../../models/User");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userRegister = async (req, res) => {
    try {
        const { email, password, fullName } = req.body;
        let user = await User.findOne({ email });
        if (user) return sendErrorResponse(res, 400, "User already exists!")
        let hashedPassword = await bcrypt.hash(password, 10);
        let newUser = await User.create({
            fullName: fullName,
            email: email.toLowerCase(),
            password: hashedPassword
        });
        if (!newUser) return sendErrorResponse(res, 400, "Unknown error. User cannot be created.")
        return res
            .status(200)
            .json({ success: true, data: "User Registered" });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, data: "Internal Server Error" });
    }
};

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password)
        if (!email) sendErrorResponse(res, 400, "Email is required");
        if (!password) sendErrorResponse(res, 400, "Password is required");

        let user = await User.findOne({ email }).select("+password");
        if (!user) return sendErrorResponse(res, 400, "Invalid Email or Password");

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return sendErrorResponse(res, 400, "Invalid Email or Password");
        }
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            // { expiresIn: "1h" }
        );
        return res.status(200).json({ success: true, data: token });
    } catch (error) {
        console.log(error);
        return sendErrorResponse(res, 500, "Internal Server Error");
    }
}

module.exports = {
    userRegister,
    userLogin
}