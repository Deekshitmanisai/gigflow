import { Gig } from "./gig.model.js";

/**
 * Create a new gig (Protected)
 */
export const createGig = async (req, res) => {
  try {
    const { title, description, budget } = req.body;

    if (!title || !description || !budget) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const gig = await Gig.create({
      title,
      description,
      budget,
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: "Gig created successfully",
      gig,
    });
  } catch (error) {
    console.error("CREATE GIG ERROR 👉", error);
    res.status(500).json({ message: "Failed to create gig" });
  }
};

/**
 * Get all gigs (Public)
 */
export const getAllGigs = async (req, res) => {
  try {
    const gigs = await Gig.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.json(gigs);
  } catch (error) {
    console.error("GET GIGS ERROR 👉", error);
    res.status(500).json({ message: "Failed to fetch gigs" });
  }
};
