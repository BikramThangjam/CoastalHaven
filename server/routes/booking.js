import express from "express";
import { stripeCheckout, deleteBooking } from "../controllers/booking.js";


const router = express.Router();

// router.post("/create", createBooking); replaced by /webhooks/stripe route

router.post("/create-checkout-session", stripeCheckout)
router.delete("/:bookingId", deleteBooking);

export default router;
