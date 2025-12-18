const { sendErrorResponse } = require("../../helpers/errorHandlers/errorHandlers");
const User = require("../../models/User");

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return sendErrorResponse(res, 400, "Invalid token");
        return res.status(200).json({ success: true, data: user })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, data: "Internal Server Error" });
    }
};

module.exports = {
    getProfile
};