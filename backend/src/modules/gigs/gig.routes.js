import { Router } from "express";
import { createGig, getAllGigs } from "./gig.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = Router();

/**
 * Public - Get all gigs
 */
router.get("/", getAllGigs);

/**
 * Protected - Create a gig
 */
router.post("/", protect, createGig);

export default router;
