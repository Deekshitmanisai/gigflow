import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-6 h-20 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2">
          <span className="bg-gray-900 text-white w-8 h-8 rounded-lg flex items-center justify-center text-lg">G</span>
          <span className="text-gray-900">GigFlow</span>
        </Link>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link to="/gigs" className="hover:text-gray-900 transition-colors">
              Browse Gigs
            </Link>
            <Link to="/how-it-works" className="hover:text-gray-900 transition-colors">
              How it Works
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link to="/create-gig" className="hidden md:block text-sm font-medium text-gray-600 hover:text-gray-900">
                  Post a Job
                </Link>
                <div className="h-6 w-px bg-gray-200 hidden md:block"></div>
                <div className="flex items-center gap-3">
                  <Link to="/profile" className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                      {user.name.charAt(0)}
                    </div>
                    <span className="hidden sm:inline">{user.name}</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-all shadow-sm hover:shadow-md"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
