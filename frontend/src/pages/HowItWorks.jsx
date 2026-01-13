import { Link } from "react-router-dom";

const HowItWorks = () => {
    return (
        <div className="font-sans text-gray-900">
            {/* Hero Section */}
            <div className="bg-gray-900 text-white py-24">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        How GigFlow Works
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Whether you're hiring or looking for work, we make it simple, secure, and transparent.
                    </p>
                </div>
            </div>

            {/* Steps Section */}
            <div className="max-w-5xl mx-auto px-6 py-20">
                <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
                    <div className="order-2 md:order-1">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl font-bold mb-6">
                            1
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Post a Job</h2>
                        <p className="text-lg text-gray-600 leading-relaxed mb-6">
                            It’s free and easy to post a job. Simply fill in a title, description, and budget and get competitive bids within minutes.
                        </p>
                        <Link to="/create-gig" className="text-blue-600 font-medium hover:underline">
                            Post a job now &rarr;
                        </Link>
                    </div>
                    <div className="order-1 md:order-2 bg-gray-100 rounded-2xl h-64 flex items-center justify-center text-6xl">
                        📝
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
                    <div className="bg-gray-100 rounded-2xl h-64 flex items-center justify-center text-6xl">
                        🤝
                    </div>
                    <div>
                        <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center text-2xl font-bold mb-6">
                            2
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Choose Freelancers</h2>
                        <p className="text-lg text-gray-600 leading-relaxed mb-6">
                            No job is too big or too small. We've got freelancers for jobs of any size or budget, across 1800+ skills. No job is too complex. We can get it done!
                        </p>
                        <Link to="/gigs" className="text-purple-600 font-medium hover:underline">
                            Browse freelancers &rarr;
                        </Link>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="order-2 md:order-1">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-2xl font-bold mb-6">
                            3
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Pay Safely</h2>
                        <p className="text-lg text-gray-600 leading-relaxed mb-6">
                            Only pay for work when it has been completed and you're 100% satisfied with the quality using our secure payment system.
                        </p>
                    </div>
                    <div className="order-1 md:order-2 bg-gray-100 rounded-2xl h-64 flex items-center justify-center text-6xl">
                        🔒
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gray-50 border-t border-gray-200 py-20 text-center">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
                    <div className="flex justify-center gap-4">
                        <Link
                            to="/register"
                            className="bg-gray-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                        >
                            Sign Up for Free
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
