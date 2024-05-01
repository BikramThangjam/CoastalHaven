import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import listingRoutes from "./routes/listing.js";
import bookingRoutes from "./routes/booking.js";
import userRoutes from "./routes/user.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json())
app.use(express.static('public'));

// Routes
app.use("/auth", authRoutes);
app.use("/properties", listingRoutes);
app.use("/bookings", bookingRoutes);
app.use("/users", userRoutes);

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