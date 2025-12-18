require("dotenv").config()
const express = require("express");
const { connectToDB } = require("./db");
const app = express();
const cors = require('cors');

connectToDB();

app.use(cors()); 
app.use(express.json());



app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "yes" });
});

app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/user"));

app.listen(process.env.PORT,
    console.log(`server is running on ${process.env.PORT}`)
);