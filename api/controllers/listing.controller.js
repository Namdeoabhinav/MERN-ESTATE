import Listing from "../models/listing.model.js"

export const createListing = async(req , res , next) => {
    try {
        //Step1 : Created the Listing model in listing.model.js
        //creating the listing
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
}