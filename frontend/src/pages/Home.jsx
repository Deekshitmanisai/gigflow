import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GigCard from "../components/GigCard";
import { fetchGigs } from "../api/gigs";

const Home = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGigs = async () => {
      try {
        const data = await fetchGigs();
        setGigs(data.slice(0, 5)); // Show only recent 5
      } catch (error) {
        console.error("Error fetching gigs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadGigs();
  }, []);

  return (
    <div className="font-sans text-gray-900">
      {/* Hero Section */}
      <div className="bg-gray-900 text-white relative overflow-hidden">
        {/* Abstract Background Pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-50%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500 blur-[100px]"></div>
          <div className="absolute bottom-[-50%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-500 blur-[100px]"></div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-32 text-center relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-gray-800 text-blue-400 text-sm font-medium mb-6 border border-gray-700">
            🚀 The #1 Marketplace for Top Talent
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
            Find your next <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              great opportunity.
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Connect with top startups and companies. Work on your own terms.
            Simple, transparent, and built for talent.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/gigs"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20"
            >
              Find Work
            </Link>
            <Link
              to="/create-gig"
              className="bg-gray-800 text-white border border-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-700 transition-all"
            >
              Post a Job
            </Link>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="bg-white py-20 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How GigFlow Works</h2>
            <p className="text-gray-500">Get started in minutes. No credit card required.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">
                📝
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Post a Job</h3>
              <p className="text-gray-500 leading-relaxed">
                Describe your project, set a budget, and get ready to receive proposals.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">
                🔍
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Hire Talent</h3>
              <p className="text-gray-500 leading-relaxed">
                Review bids, chat with freelancers, and hire the best fit for your needs.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">
                💸
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Get Paid</h3>
              <p className="text-gray-500 leading-relaxed">
                Complete the work and get paid securely. Simple and transparent.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Gigs Section */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Recent Openings
          </h2>
          <Link to="/gigs" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
            View all jobs &rarr;
          </Link>
        </div>

        {loading ? (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-50 rounded-lg"></div>
            ))}
          </div>
        ) : gigs.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 mb-4">No gigs available at the moment.</p>
            <Link to="/create-gig" className="text-blue-600 font-medium hover:underline">
              Be the first to post a gig
            </Link>
          </div>
        ) : (
          <div className="space-y-0">
            {gigs.map((gig) => (
              <GigCard
                key={gig._id}
                id={gig._id}
                title={gig.title}
                description={gig.description}
                budget={gig.budget}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
