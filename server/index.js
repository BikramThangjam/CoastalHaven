const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config()
const cors = require("cors");
const authRoutes = require("./routes/auth")

app.use(cors());
app.use(express.json())
app.use(express.static('public'));

// Routes
app.use("/auth", authRoutes);

// Mongoose setup
const PORT = process.env.PORT || 5001

mongoose.connect(process.env.MONGO_URL, {
    dbName: "coastalhaven",
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> {
    app.listen(PORT, ()=> console.log(`Server is listening on ${PORT}`))
})
.catch(err => console.log(`${err} did not connect`))