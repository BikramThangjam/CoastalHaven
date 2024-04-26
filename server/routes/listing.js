const router = require("express").Router();
const multer = require("multer");

const Listing = require("../models/Listing");


// Multer configuration for file uploads

const storage = multer.diskStorage({
    destination: function(req, file,  cb){
        cb(null, "public/uploads")
    },
     filename: function (req, file, cb){
        cb(null, file.originalname); // orifinal filename
     }
})

const upload = multer({storage})

// Create listing
router.post("/create", upload.array("listingPhotos"), async(req, res) => {
    try {
        
        const {
            creator,
            category,
            type,
            streetAddress,
            aptSuite,
            city, 
            state, 
            country, 
            guestCount,
            bedroomCount,
            bedCount,
            bathroomCount,
            amenities,
            title,
            description,
            highlight,
            highlightDesc,
            price
        } = req.body;

        
        const listingPhotos = req.files;
        if(!listingPhotos){
            return res.status(400).send("No File uploaded");
        }
        const listingPhotoPaths = listingPhotos.map(file => file.path);
        const newListing = new Listing({
            creator,
            category,
            type,
            streetAddress,
            aptSuite,
            city, 
            state, 
            country, 
            guestCount,
            bedroomCount,
            bedCount,
            bathroomCount,
            amenities,
            listingPhotoPaths,
            title,
            description,
            highlight,
            highlightDesc,
            price

        })

        await newListing.save();
        res.status(200).json(newListing)

    } catch (err) {
        res.status(409).json({
            message: "Fail to create listing",
            error: err.message,
        })
        console.log(err)
    }
})

// Get listing
router.get("/", async(req, res) => {
    const qCategory = req.query.category

    try {

        let listings;
        if(qCategory){
            listings = await Listing.find({category: qCategory}).populate("creator");
        }else{
            listings = await Listing.find();
        }

        res.status(200).json(listings)

    } catch (err) {
        res.status(409).json({
            message: "Fail to fetch listings",
            error: err.message,
        })
        console.log(err)
    }
});

module.exports = router;