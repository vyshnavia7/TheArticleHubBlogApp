import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useClerk, useUser } from "@clerk/clerk-react";
import { userAuthorContextObj } from "../../contexts/UserAuthorContext";

function Header() {
  const { signOut } = useClerk();
  const { isSignedIn, user } = useUser();
  const { currentUser, setCurrentUser } = useContext(userAuthorContextObj);
  const navigate = useNavigate();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false); // State for toggling navbar

  // Function to sign out
  async function handleSignOut() {
    await signOut();
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/", { replace: true });
  }

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark px-3">
      {/* Logo Section */}
      <Link to="/" className="navbar-brand d-flex align-items-center">
        <img
          src="https://www.shutterstock.com/image-vector/blog-writing-line-icon-web-600nw-2366232875.jpg"
          className="border rounded-5 me-3"
          alt="logo"
          width="50"
          height="50"
        />
        <span className="fw-bold text-white">The Article Hub</span>
      </Link>

      {/* Toggle Button for Mobile View */}
      <button
        className="navbar-toggler"
        type="button"
        onClick={() => setIsNavbarOpen(!isNavbarOpen)}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Navbar Links */}
      <div className={`collapse navbar-collapse ${isNavbarOpen ? "show" : ""}`}>
        <ul className="navbar-nav ms-auto">
          {!isSignedIn ? (
            <>
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link fs-5 fw-bold"
                  onClick={() => setIsNavbarOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/signin"
                  className="nav-link fs-5 fw-bold"
                  onClick={() => setIsNavbarOpen(false)}
                >
                  Signin
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/signup"
                  className="nav-link fs-5 fw-bold"
                  onClick={() => setIsNavbarOpen(false)}
                >
                  Signup
                </Link>
              </li>
            </>
          ) : (
            <div className="d-flex align-items-center">
              <div className="position-relative me-3">
                <img
                  src={user.imageUrl}
                  width="40"
                  className="rounded-circle"
                  alt="user"
                />
                <span className="badge bg-primary me-2 mx-2">
                  {currentUser?.role}
                </span>
              </div>
              <p className="mb-0 text-white me-3 fw-bold">{user.firstName}</p>
              <button
                className="btn btn-danger btn-sm fw-bold"
                onClick={() => {
                  handleSignOut();
                  setIsNavbarOpen(false);
                }}
              >
                Signout
              </button>
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
