require("dotenv").config({ quiet: true })
const { default: mongoose } = require("mongoose");

const connectToDB = async () => {
    await mongoose.connect(process.env.MONGODB_STRING);
    console.log("Connected to database")
}


module.exports = {
    connectToDB
}