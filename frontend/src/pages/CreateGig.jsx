import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createGig } from "../api/gigs";
import { useAuth } from "../context/AuthContext";

const CreateGig = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await createGig({
        title,
        description,
        budget: Number(budget),
      });
      navigate("/gigs");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create gig");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Join to post a gig</h2>
        <p className="text-gray-600 mb-8">You need to be logged in to create a new job listing.</p>
        <button
          onClick={() => navigate("/login")}
          className="bg-gray-900 text-white px-8 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
        >
          Log In / Sign Up
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 font-sans">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a new gig</h1>
        <p className="text-gray-500">
          Reach thousands of top-rated freelancers.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded-r">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Job Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="e.g. Senior React Developer needed for Fintech project"
            className="w-full px-0 py-3 border-b-2 border-gray-200 focus:border-gray-900 transition-colors outline-none bg-transparent text-lg placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="8"
            placeholder="Describe the project details, requirements, and deliverables..."
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none bg-gray-50 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Budget (₹)
          </label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
            min="0"
            placeholder="e.g. 50000"
            className="w-full px-0 py-3 border-b-2 border-gray-200 focus:border-gray-900 transition-colors outline-none bg-transparent text-lg placeholder-gray-400"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-gray-900 text-white px-10 py-3 rounded-md font-medium hover:bg-gray-800 disabled:opacity-50 transition-colors text-lg"
          >
            {loading ? "Publishing..." : "Post Gig"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateGig;
