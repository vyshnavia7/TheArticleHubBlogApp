import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

function AuthorProfile() {
  const [authors, setAuthors] = useState();
  return (
    <div className="author-profile mt-5 container">
      <ul className="d-flex nav justify-content-around list-unstyled fs-3 flex-column flex-md-row gap-3 gap-md-5 ">
        <li className="nav-item">
          <NavLink to="articles" className="nav-link fw-bold text-white">
            Articles
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="article" className="nav-link fw-bold text-white">
            Add new article
          </NavLink>
        </li>
      </ul>
      <div className="mt-5">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthorProfile;
