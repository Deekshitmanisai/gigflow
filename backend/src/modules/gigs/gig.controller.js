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
 * Get all open gigs (Public) + Search by title
 */
export const getAllGigs = async (req, res) => {
  try {
    const { search } = req.query;

    // Base query: show all gigs (open and assigned)
    const query = {};

    // Optional search by title (case-insensitive)
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const gigs = await Gig.find(query)
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.json(gigs);
  } catch (error) {
    console.error("GET GIGS ERROR 👉", error);
    res.status(500).json({ message: "Failed to fetch gigs" });
  }
};

/**
 * Get a single gig by ID (Public)
 */
export const getGigById = async (req, res) => {
  try {
    const { id } = req.params;

    const gig = await Gig.findById(id).populate("createdBy", "name email");

    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    res.json(gig);
  } catch (error) {
    console.error("GET GIG BY ID ERROR 👉", error);
    res.status(500).json({ message: "Failed to fetch gig" });
  }
};