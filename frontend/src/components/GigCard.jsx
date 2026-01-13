import { Link } from "react-router-dom";

const GigCard = ({ title, description, budget, id }) => {
  return (
    <div className="group py-6 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors -mx-4 px-4 rounded-lg">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <Link
            to={`/gigs/${id}`}
            className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors block mb-1 truncate"
          >
            {title}
          </Link>
          <p className="text-sm text-gray-500 mb-3 font-medium">
            Budget: <span className="text-gray-900">₹{budget}</span>
          </p>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        <div className="flex-shrink-0 pt-1">
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
            New
          </span>
        </div>
      </div>
    </div>
  );
};

export default GigCard;
