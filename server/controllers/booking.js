import Booking from "../models/Booking.js";

// Create booking
export const createBooking = async (req, res) => {
    try {
      const { customerId, hostId, listingId, startDate, endDate, totalPrice } = req.body;
      const newBooking = new Booking({
        customerId,
        hostId,
        listingId,
        startDate,
        endDate,
        totalPrice,
      });
  
      await newBooking.save()
      res.status(200).json(newBooking);
    } catch (err) {
      console.log(err)
      res.status(400).json({message: "Failed to create a new booking", error: err.message})
    }
  }

  // Delete booking
export const deleteBooking = async (req, res) => {
  const { bookingId } = req.params;
  try {
     const deletedBooking = await Booking.findByIdAndDelete(bookingId);
    
     if (!deletedBooking) {
       return res.status(404).json({ error: 'Booking not found' });
     }
    
     res.json({ message: 'Booking has been cancelled' });
  } catch (err) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}