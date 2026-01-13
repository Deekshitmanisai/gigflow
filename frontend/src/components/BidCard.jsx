const BidCard = ({ bid, isOwner, onHire, gigStatus }) => {
  return (
    <div className="bg-white p-4 rounded border border-gray-200">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-gray-600 text-sm">
            {bid.bidder?.name || "Unknown"}
          </p>
          <p className="text-lg font-semibold mt-1">₹{bid.amount}</p>
          {bid.message && (
            <p className="text-gray-600 mt-2 text-sm">{bid.message}</p>
          )}
          <p className="text-xs text-gray-400 mt-2">
            Status: {bid.status}
          </p>
        </div>
        {isOwner && gigStatus === "open" && bid.status === "pending" && (
          <button
            onClick={() => onHire(bid._id)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
          >
            Hire
          </button>
        )}
      </div>
    </div>
  );
};

export default BidCard;
