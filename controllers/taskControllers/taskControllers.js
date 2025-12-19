const { sendErrorResponse } = require("../../helpers/errorHandlers/errorHandlers");
const Task = require("../../models/Task");
const User = require("../../models/User");


const createTask = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return sendErrorResponse(res, 400, "User not found");

        const { title,
            description,
            status,
            priority,
            dueDate } = req.body;

        if (!title || !description) return sendErrorResponse(res, 400, "Required fields are missing");

        const newTask = await Task.create({
            title,
            description,
            status: status ? status : "pending",
            priority,
            dueDate,
            userID: user._id
        })

        if (!newTask) return sendErrorResponse(res, 400, "Task cannot be created");

        return res.status(200).json({ success: true, data: newTask });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, data: "Internal Server Error" })
    }
};

const getTask = async (req, res) => {
    try {
        const { status, priority, search, limit, page = 1 } = req.query;
        const user = await User.findById(req.user.id);
        if (!user) return sendErrorResponse(res, 400, "User not found");
        const { id } = req.query;
        if (id) {
            const singleTask = await Task.findById(id);
            if (!singleTask) return sendErrorResponse(res, 400, "Task not found")
        }
        const query = {
            userID: user._id
        };

        if (status) {
            query.status = status;
        }

        if (priority) {
            query.priority = priority;
        }

        if (search) {
            query.title = { $regex: search, $options: "i" };
        }
        const allTasks = await Task.find(query).skip((page - 1) * limit).limit(limit);
        const count = await Task.countDocuments({userID: user._id});
        return res.status(200).json({ success: true, data: {taskList: allTasks, count} })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, data: "Internal Server Error" });
    }
};

const editTask = async(req,res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return sendErrorResponse(res, 400, "User not found");

        const {taskID} = req.query;

        const { title,
            description,
            status,
            priority,
            dueDate } = req.body;

            const updateData = {
                title,
                description,
                status,
                priority,
                dueDate
            }

        const existingTask = await Task.findOneAndUpdate({_id: taskID},{$set: updateData}, {new: true})

        if (!existingTask) return sendErrorResponse(res, 400, "Task not found");

        return res.status(200).json({ success: true, data: existingTask });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, data: "Internal Server Error" })
    }
};

const deleteTask = async(req,res) => {
    try {
        const {taskID} = req.query
        const user = await User.findById(req.user.id);
        if (!user) return sendErrorResponse(res, 400, "User not found");

        const existingTask = await Task.findOneAndDelete({_id: taskID, userID: user._id});
        if (!existingTask) return sendErrorResponse(res, 400, "Task not found");

        return res.status(200).json({success: true, data: "Task deleted successfully"});
    } catch (error) {
        console.error(error)
        return res.status(500).json({success: false, data: "Internal Server Error"})
    }
}

module.exports = {
    createTask,
    getTask,
    editTask,
    deleteTask
}