import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { userAuthorContextObj } from "../../contexts/UserAuthorContext";
import { useNavigate } from "react-router-dom";
function Blocked() {
  const { currentUser, setCurrentUser } = useContext(userAuthorContextObj);
  const navigate = useNavigate();
  useEffect(() => {
    //   if (!currentUser || currentUser === undefined) {
    //     navigate("/", { replace: true });
    //   } else if (currentUser?.isBlocked) {
    //     navigate("/blocked", { replace: true });
    //   }
    // }, [currentUser, navigate]);
    // if (!currentUser || !currentUser.isBlocked) {
    //   return null; // Avoid rendering the blocked message while redirecting
    console.log("currentUser:", currentUser); // Debugging log

    if (currentUser === undefined) return; // Ensure the state has resolved

    if (!currentUser) {
      console.log("Redirecting to /");
      navigate("/", { replace: true });
    } else if (currentUser?.isBlocked) {
      console.log("Redirecting to blocked/");
      navigate("/blocked", { replace: true });
    }
  }, [currentUser, navigate]);
  return (
    <div
      className="blocked-container"
      style={{ textAlign: "center", padding: "50px" }}
    >
      <iframe src="https://lottie.host/embed/51240e78-a71f-4869-bbe5-dcc1ea5050fa/aC5wDyPTsN.lottie"></iframe>
      <h2 className="blocked-title" style={{ color: "red" }}>
        Access Denied
      </h2>
      <p className="blocked-message">
        You have been blocked by the admin. Please contact support for
        assistance.
      </p>
    </div>
  );
}

export default Blocked;
