import { Router } from "express";
import { placeBid, getBidsForGig, hireBid, checkBidStatus } from "./bid.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = Router();

/**
 * Protected - Place a bid on a gig
 */
router.post("/", protect, placeBid);

/**
 * Get all bids for a specific gig
 */
router.get("/gig/:gigId", protect, getBidsForGig);
router.get("/check/:gigId", protect, checkBidStatus);
router.patch("/:bidId/hire", protect, hireBid);


export default router;
