import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchGigById } from "../api/gigs";
import { placeBid, fetchBidsForGig, hireBid, checkBidStatus } from "../api/bids";
import { useAuth } from "../context/AuthContext";

const GigDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [gig, setGig] = useState(null);
  const [bids, setBids] = useState([]);
  const [myBid, setMyBid] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bidAmount, setBidAmount] = useState("");
  const [bidMessage, setBidMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadGig();
  }, [id]);

  useEffect(() => {
    if (gig && user) {
      if (user._id === gig.createdBy?._id) {
        loadBids();
      } else {
        checkMyBid();
      }
    }
  }, [gig, user]);

  const loadGig = async () => {
    try {
      const data = await fetchGigById(id);
      setGig(data);
    } catch (error) {
      console.error("Error fetching gig:", error);
      setError("Failed to load gig");
    } finally {
      setLoading(false);
    }
  };

  const loadBids = async () => {
    try {
      const data = await fetchBidsForGig(id);
      setBids(data);
    } catch (error) {
      console.error("Error fetching bids:", error);
      setBids([]);
    }
  };

  const checkMyBid = async () => {
    try {
      const data = await checkBidStatus(id);
      if (data.hasBid) {
        setMyBid(data.bid);
      }
    } catch (error) {
      console.error("Error checking bid status:", error);
    }
  };

  const handlePlaceBid = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await placeBid({
        gigId: id,
        amount: Number(bidAmount),
        message: bidMessage,
      });
      setBidAmount("");
      setBidMessage("");
      setMyBid(response.bid); // Update local state to show status immediately
      alert("Bid placed successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place bid");
    } finally {
      setSubmitting(false);
    }
  };

  const handleHire = async (bidId) => {
    if (!window.confirm("Are you sure you want to hire this freelancer?")) return;

    try {
      await hireBid(bidId);
      alert("Freelancer hired successfully!");
      loadGig(); // Refresh gig status
      loadBids(); // Refresh bids status
    } catch (err) {
      alert(err.response?.data?.message || "Failed to hire freelancer");
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!gig) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <p className="text-gray-500 text-lg">Gig not found</p>
        <Link to="/gigs" className="text-blue-600 hover:underline mt-4 inline-block">
          Back to Gigs
        </Link>
      </div>
    );
  }

  const isOwner = user?._id === gig.createdBy?._id;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 font-sans text-gray-900">
      {/* Header Section */}
      <div className="mb-10 border-b border-gray-100 pb-8">
        <div className="flex justify-between items-start">
          <h1 className="text-3xl font-bold mb-4 tracking-tight text-gray-900">
            {gig.title}
          </h1>
          {gig.status === "assigned" && (
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
              Assigned
            </span>
          )}
        </div>
        <div className="flex items-center text-sm text-gray-500 space-x-4">
          <span>Posted by <span className="font-medium text-gray-900">{gig.createdBy?.name || "Unknown"}</span></span>
          <span>•</span>
          <span>Budget: <span className="font-medium text-gray-900">₹{gig.budget}</span></span>
        </div>
      </div>

      {/* Description */}
      <div className="mb-12">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Description</h3>
        <p className="text-gray-600 whitespace-pre-wrap leading-relaxed text-lg">
          {gig.description}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded-r">
          <p>{error}</p>
        </div>
      )}

      {/* Bidding Section (Freelancer View) */}
      {!isOwner && user && (
        <div className="bg-gray-50 rounded-lg p-8 border border-gray-100">
          {myBid ? (
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Your Proposal Status</h2>
              <div className="inline-block px-6 py-2 rounded-full text-lg font-medium mb-4 bg-gray-100 text-gray-800">
                {myBid.status === "hired" ? (
                  <span className="text-green-600">🎉 You have been Hired!</span>
                ) : myBid.status === "rejected" ? (
                  <span className="text-red-600">Proposal Rejected</span>
                ) : (
                  <span className="text-blue-600">Proposal Pending</span>
                )}
              </div>
              <p className="text-gray-600">
                You bid <strong>₹{myBid.amount}</strong> on this gig.
              </p>
            </div>
          ) : gig.status === "open" ? (
            <>
              <h2 className="text-xl font-semibold mb-6 text-gray-900">Submit a Proposal</h2>
              <form onSubmit={handlePlaceBid} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bid Amount (₹)</label>
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    required
                    min="0"
                    placeholder="e.g. 5000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cover Letter</label>
                  <textarea
                    value={bidMessage}
                    onChange={(e) => setBidMessage(e.target.value)}
                    rows="6"
                    placeholder="Explain why you are the best fit for this gig..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none bg-white resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto bg-gray-900 text-white px-8 py-3 rounded-md font-medium hover:bg-gray-800 disabled:opacity-50 transition-colors"
                >
                  {submitting ? "Sending Proposal..." : "Place Bid"}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <p className="text-gray-500">This gig is no longer accepting proposals.</p>
            </div>
          )}
        </div>
      )}

      {!user && (
        <div className="bg-gray-50 rounded-lg p-8 text-center border border-gray-100">
          <p className="text-gray-600 mb-4">Please log in to place a bid on this gig.</p>
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Log In / Sign Up
          </Link>
        </div>
      )}

      {/* Existing Bids (Owner Only) */}
      {isOwner && (
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 border-b border-gray-100 pb-4">
            Received Proposals ({bids.length})
          </h2>
          {bids.length === 0 ? (
            <p className="text-gray-500 italic">No proposals yet.</p>
          ) : (
            <div className="space-y-0 divide-y divide-gray-100">
              {bids.map((bid) => (
                <div key={bid._id} className="py-6 first:pt-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">{bid.bidder?.name || "Unknown Freelancer"}</h4>
                      <p className="text-sm text-gray-500">{bid.bidder?.email}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-gray-900 text-lg block">₹{bid.amount}</span>
                      {bid.status === "hired" ? (
                        <span className="inline-block mt-2 bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                          Hired
                        </span>
                      ) : bid.status === "rejected" ? (
                        <span className="inline-block mt-2 bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded">
                          Rejected
                        </span>
                      ) : gig.status === "open" ? (
                        <button
                          onClick={() => handleHire(bid._id)}
                          className="mt-2 text-sm bg-gray-900 text-white px-4 py-1 rounded hover:bg-gray-800 transition-colors"
                        >
                          Hire
                        </button>
                      ) : null}
                    </div>
                  </div>
                  {bid.message && (
                    <p className="text-gray-600 mt-3 text-sm leading-relaxed bg-gray-50 p-4 rounded-md">
                      {bid.message}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GigDetails;
