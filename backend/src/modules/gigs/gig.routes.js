import { Router } from "express";
import { createGig, getAllGigs, getGigById } from "./gig.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = Router();

/**
 * Public - Get all gigs
 */
router.get("/", getAllGigs);

/**
 * Public - Get a single gig by ID
 */
router.get("/:id", getGigById);

/**
 * Protected - Create a gig
 */
router.post("/", protect, createGig);

export default router;
