import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import worker from "../../assets/worker.svg";

const Home = () => {
  const navigate = useNavigate();
  const {
    logout,
    user,
    loggedUser,
    statusAuth,
    accessAuth,
    editAuth,
    deleteAuth,
  } = useAuth();

  if (loggedUser) {
    var cnt = 0;
    if (cnt < 0) {
      window.location.reload();
      cnt++;
    }
  }

  useEffect(() => {
    if (loggedUser) {
      var cnt = 0;
      if (cnt < 0) {
        window.location.reload();
        cnt++;
      }
    }

    if (!loggedUser) {
      navigate("/");
    }
  }, [loggedUser, user?.token, window.location.pathname]);

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="max-w-6xl mx-auto px-4 py-12 flex items-center justify-center min-h-screen">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left side content */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start space-y-6">
            <div className="text-center md:text-left">
              <h1 className="text-blue-600 font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
                Seamless Role
                <br /> Based Access
              </h1>
            </div>

            {user?.token ? (
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <Link to="/user/dashboard" className="w-full sm:w-auto">
                  <button className="w-full px-8 py-3 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors duration-200 shadow-lg">
                    User Dashboard
                  </button>
                </Link>

                {(accessAuth || editAuth || deleteAuth) && (
                  <Link to="/admin/dashboard" className="w-full sm:w-auto">
                    <button className="w-full px-8 py-3 bg-blue-800 rounded-lg text-white hover:bg-blue-900 transition-colors duration-200 shadow-lg">
                      Admin Dashboard
                    </button>
                  </Link>
                )}
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <Link to="/login" className="w-full sm:w-auto">
                  <button className="w-full px-12 py-3 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors duration-200 shadow-lg">
                    Login
                  </button>
                </Link>
                <Link to="/register" className="w-full sm:w-auto">
                  <button className="w-full px-12 py-3 bg-white border-2 border-blue-600 rounded-lg text-blue-600 hover:bg-gray-50 transition-colors duration-200 shadow-lg">
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Right side illustration */}
          <div className="w-full md:w-1/2">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-blue-50 rounded-full opacity-20" />
              <div className="relative w-full h-full">
                <img
                  src={worker}
                  alt="Person working on laptop"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="absolute bottom-0 right-0">
                <div className="w-12 h-20 bg-blue-600/20 rounded-full" />
              </div>
            </div>
          </div>

          {user?.token && (
            <button
              onClick={logout}
              className="absolute top-8 right-8 px-6 py-2 text-sm border border-red-200 rounded-lg text-red-600 hover:bg-red-600 hover:text-white transition-colors duration-200"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
