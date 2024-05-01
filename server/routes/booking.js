import express from "express";
import { createBooking, deleteBooking } from "../controllers/booking.js";


const router = express.Router();

router.post("/create", createBooking);
router.delete("/:bookingId", deleteBooking);

export default router;
