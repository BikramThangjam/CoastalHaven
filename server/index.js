import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import authRoutes from "./routes/auth.js";
import listingRoutes from "./routes/listing.js";
import bookingRoutes from "./routes/booking.js";
import userRoutes from "./routes/user.js";
import { stripeWebhooks } from "./controllers/booking.js";

const app = express();
app.use(cors());

//Webhook payload must be provided as a string or a Buffer instance representing the _raw_ request body.
//Hence placing it before the app.use(express.json()) to avoid being parsed to js object
app.post("/webhooks/stripe",express.raw({type: 'application/json'}), stripeWebhooks)

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