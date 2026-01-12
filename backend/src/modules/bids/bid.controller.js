import { Bid } from "./bid.model.js";
import { Gig } from "../gigs/gig.model.js";

/**
 * Place a bid on a gig (Protected)
 */
export const placeBid = async (req, res) => {
  try {
    const { gigId, amount, message } = req.body;

    if (!gigId || !amount) {
      return res.status(400).json({ message: "Gig ID and amount are required" });
    }

    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    // Prevent bidding on own gig
    if (gig.createdBy.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: "You cannot bid on your own gig" });
    }

    const bid = await Bid.create({
      gig: gigId,
      bidder: req.user._id,
      amount,
      message,
    });

    res.status(201).json({
      message: "Bid placed successfully",
      bid,
    });
  } catch (error) {
    console.error("PLACE BID ERROR 👉", error);
    res.status(500).json({ message: "Failed to place bid" });
  }
};

/**
 * Get all bids for a gig
 */
export const getBidsForGig = async (req, res) => {
  try {
    const { gigId } = req.params;

    const bids = await Bid.find({ gig: gigId })
      .populate("bidder", "name email")
      .sort({ createdAt: -1 });

    res.json(bids);
  } catch (error) {
    console.error("GET BIDS ERROR 👉", error);
    res.status(500).json({ message: "Failed to fetch bids" });
  }
};
