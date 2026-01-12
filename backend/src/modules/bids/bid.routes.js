import { Router } from "express";
import { placeBid, getBidsForGig } from "./bid.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = Router();

/**
 * Protected - Place a bid on a gig
 */
router.post("/", protect, placeBid);

/**
 * Get all bids for a specific gig
 */
router.get("/gig/:gigId", getBidsForGig);

export default router;
