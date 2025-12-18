const { default: mongoose, Schema } = require("mongoose");

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["pending", "completed"]
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"]
    },
    dueDate: {
        type: Date,
        default: null
    },
    userID: {
        type: Schema.Types.ObjectId,
        required: true
    }

});

const Task = mongoose.model("task", taskSchema);
module.exports = Task;