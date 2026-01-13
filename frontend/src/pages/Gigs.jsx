import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GigCard from "../components/GigCard";
import { fetchGigs } from "../api/gigs";

const Gigs = () => {
    const [gigs, setGigs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadGigs();
    }, []);

    const loadGigs = async (query = "") => {
        setLoading(true);
        try {
            const data = await fetchGigs(query);
            setGigs(data);
        } catch (error) {
            console.error("Error fetching gigs:", error);
            setError("Failed to load gigs. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        loadGigs(search);
    };

    return (
        <div className="max-w-5xl mx-auto px-6 py-12 font-sans text-gray-900">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-100 pb-8 gap-6">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-3">
                        Browse Gigs
                    </h1>
                    <p className="text-lg text-gray-500">
                        Find the perfect project for your skills.
                    </p>
                </div>
                <Link
                    to="/create-gig"
                    className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-all shadow-md hover:shadow-lg"
                >
                    Post a Job
                </Link>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-12">
                <div className="relative max-w-2xl">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="text-gray-400 text-xl">🔍</span>
                    </div>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search gigs by title (e.g. React, Design)..."
                        className="w-full pl-12 pr-32 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm text-lg transition-all"
                    />
                    <button
                        type="submit"
                        className="absolute right-2 top-2 bottom-2 bg-gray-900 text-white px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                    >
                        Search
                    </button>
                </div>
            </form>

            {loading ? (
                <div className="space-y-6 animate-pulse">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-32 bg-gray-50 rounded-lg"></div>
                    ))}
                </div>
            ) : error ? (
                <div className="text-center py-12 bg-red-50 rounded-lg text-red-600">
                    <p>{error}</p>
                </div>
            ) : gigs.length === 0 ? (
                <div className="text-center py-24 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No gigs found</h3>
                    <p className="text-gray-500 mb-6">Try adjusting your search or check back later.</p>
                    <Link
                        to="/create-gig"
                        className="text-blue-600 font-medium hover:underline"
                    >
                        Post the first gig
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
    );
};

export default Gigs;
