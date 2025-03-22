import React from "react";
import { Link, Outlet } from "react-router-dom";
function UserProfile() {
  return (
    <div className="container-fluid">
      <ul className="d-flex flex-wrap justify-content-lg-around list-unstyled fs-3">
        <li className="nav-item">
          <Link
            to="articles"
            className="nav-link mt-lg-5 mt-3 fw-bold display-3 text-white"
          >
            Articles
          </Link>
        </li>
      </ul>
      <div className="mt-lg-5 mt-3">
        <Outlet />
      </div>
    </div>
  );
}

export default UserProfile;
