import mongoose from "mongoose";
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
 * Get all bids for a gig (ONLY GIG OWNER)
 */
export const getBidsForGig = async (req, res) => {
  try {
    const { gigId } = req.params;

    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    if (gig.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to view bids" });
    }

    const bids = await Bid.find({ gig: gigId })
      .populate("bidder", "name email")
      .sort({ createdAt: -1 });

    res.json(bids);
  } catch (error) {
    console.error("GET BIDS ERROR 👉", error);
    res.status(500).json({ message: "Failed to fetch bids" });
  }
};

/**
 * Hire a freelancer (ATOMIC & SAFE)
 */
export const hireBid = async (req, res) => {
  try {
    const { bidId } = req.params;

    // 1. Find bid
    const bid = await Bid.findById(bidId);
    if (!bid) {
      return res.status(404).json({ message: "Bid not found" });
    }

    // 2. Find gig
    const gig = await Gig.findById(bid.gig);
    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    // 3. Ownership check
    if (gig.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to hire" });
    }

    // 4. Prevent double hire
    if (gig.status === "assigned") {
      return res.status(400).json({ message: "Gig already assigned" });
    }

    // 5. Hire selected bid
    bid.status = "hired";
    await bid.save();

    // 6. Reject other bids
    await Bid.updateMany(
      { gig: gig._id, _id: { $ne: bid._id } },
      { status: "rejected" }
    );

    // 7. Update gig
    gig.status = "assigned";
    await gig.save();

    res.json({
      message: "Freelancer hired successfully",
      hiredBid: bid,
    });
  } catch (error) {
    console.error("HIRE BID ERROR 👉", error);
    res.status(500).json({ message: "Failed to hire freelancer" });
  }
};

/**
 * Check if current user has bid on a gig
 */
export const checkBidStatus = async (req, res) => {
  try {
    const { gigId } = req.params;

    const bid = await Bid.findOne({ gig: gigId, bidder: req.user._id });

    if (!bid) {
      return res.json({ hasBid: false });
    }

    res.json({ hasBid: true, bid });
  } catch (error) {
    console.error("CHECK BID STATUS ERROR 👉", error);
    res.status(500).json({ message: "Failed to check bid status" });
  }
};
