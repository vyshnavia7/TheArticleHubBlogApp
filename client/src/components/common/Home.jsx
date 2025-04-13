import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { userAuthorContextObj } from "../../contexts/UserAuthorContext";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
function Home() {
  const { currentUser, setCurrentUser } = useContext(userAuthorContextObj);
  const { isSignedIn, user, isLoaded } = useUser();
  const [error, setError] = useState("");
  const [isRoleSelected, setIsRoleSelected] = useState(false); // To track first correct role selection
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    if (currentUser?.isBlocked) {
      navigate("/blocked", { replace: true });
    } else if (!currentUser || currentUser === undefined) {
      navigate("/", { replace: true });
    }
  }, [currentUser, navigate]);

  async function onSelectRole(e) {
    if (isRoleSelected) return; // Prevent further role changes once valid role is chosen

    setError("");
    const selectedRole = e.target.value;

    if (!["author", "user", "admin"].includes(selectedRole)) {
      setError("Invalid role selected. Please choose a valid role.");
      return;
    }

    const updatedUser = { ...currentUser, role: selectedRole };
    let res = null;
    let url = "";

    if (selectedRole === "author") {
      url = `${BACKEND_URL}/author-api/author`;
    } else if (selectedRole === "user") {
      url = `${BACKEND_URL}/user-api/user`;
    } else if (selectedRole === "admin") {
      url = `${BACKEND_URL}/admin-api/users`;
    }

    try {
      res = await axios.post(url, updatedUser);
      let { message, payload } = res.data;
      console.log("hi:", payload);
      if (message === selectedRole) {
        setCurrentUser({ ...currentUser, ...payload });
        localStorage.setItem("currentUser", JSON.stringify(payload));
        setIsRoleSelected(true); // Lock selection after first valid choice

        // Redirect user to the corresponding profile
        navigate(`/${selectedRole}-profile/${payload.email}`);
      } else {
        setError("Invalid role selection. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while selecting role. Try again.");
    }
  }

  useEffect(() => {
    setCurrentUser({
      ...currentUser,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.emailAddresses[0]?.emailAddress,
      profileImageUrl: user?.imageUrl,
    });
  }, [isLoaded, user, setCurrentUser]);

  return (
    <div className="container-fluid ">
      {!isSignedIn && (
        <div className="text-center mt-4">
          <p className="abc fw-bold mb-4">
            The Article Hub - Blogging made Simple.
          </p>
          <p className="lead fs-3 v text-white mb-5">
            Explore, learn and Inspire!
          </p>
          <div className="row g-3 d-flex justify-content-center">
            <div className="col-md-4 col-sm-6">
              <img
                src="https://img.freepik.com/free-vector/blog-post-concept-illustration_114360-28016.jpg"
                alt=""
                width="300px"
                height="300px"
                className=" img-fluid border rounded-4 shadow av"
                style={{ maxWidth: "100%" }}
              />
            </div>
            <div className="col-md-4 col-sm-6">
              <img
                src="https://img.freepik.com/free-vector/publish-article-concept-illustration_114360-27531.jpg"
                alt=""
                width="300px"
                height="300px"
                className="img-fluid border rounded-4 shadow av"
                style={{ maxWidth: "100%" }}
              />
            </div>
            <div className="col-md-4 col-sm-6">
              <img
                src="https://img.freepik.com/free-vector/blogging-illustration-concept_114360-851.jpg?semt=ais_hybrid"
                alt=""
                width="300px"
                height="300px"
                className="img-fluid border rounded-4 shadow av"
                style={{ maxWidth: "100%" }}
              />
            </div>
          </div>
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mt-5 p-4"
          >
            <h2 className="fw-bold">📝 About Us</h2>
            <p className="text-muted">
              A creative platform for writers, thinkers, and dreamers. Publish
              your thoughts, learn from others, and engage with a like-minded
              community.
            </p>
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="row mt-5 text-center"
          >
            <h2 className="fw-bold mb-4">⚡ Why Choose Us?</h2>
            {[
              {
                icon: "fas fa-pen-nib",
                title: "Easy Publishing",
                desc: "Create and share articles effortlessly.",
                color: "text-primary",
              },
              {
                icon: "fas fa-comments",
                title: "Engaging Discussions",
                desc: "Interact with a vibrant community.",
                color: "text-success",
              },
              {
                icon: "fas fa-brain",
                title: "AI-Powered Insights",
                desc: "Get personalized content suggestions.",
                color: "text-danger",
              },
            ].map((feature, index) => (
              <div key={index} className="col-md-4">
                <motion.div whileHover={{ scale: 1.1 }} className="p-3">
                  <i className={`${feature.icon} fa-3x ${feature.color}`}></i>
                  <h4 className="mt-3">{feature.title}</h4>
                  <p className="text-muted">{feature.desc}</p>
                </motion.div>
              </div>
            ))}
          </motion.div>
          {/* CTA Section */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-white mt-5 fw-bold display-6"
          >
            Join 100M+ Users Who Trust Us.
          </motion.p>
          {/* Testimonials Section (Grid Layout) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mt-5 p-4"
          >
            <h2 className="fw-bold text-center">🌟 What Our Users Say</h2>
            <div className="row mt-4">
              {[
                {
                  name: "Emily R.",
                  review: "The best blogging platform I've ever used!",
                  img: "https://i.pravatar.cc/100?img=1",
                },
                {
                  name: "John D.",
                  review: "Super easy to publish and interact with readers!",
                  img: "https://i.pravatar.cc/100?img=2",
                },
                {
                  name: "Sophia L.",
                  review: "A great place to share my ideas and knowledge!",
                  img: "https://i.pravatar.cc/100?img=3",
                },
              ].map((user, index) => (
                <div key={index} className="col-md-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="card p-3 shadow border-0 text-center"
                  >
                    <img
                      src={user.img}
                      alt={user.name}
                      className="rounded-circle mx-auto"
                      width="80"
                    />
                    <h5 className="mt-3">{user.name}</h5>
                    <p className="text-muted fst-italic">"{user.review}"</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* How It Works Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-5 p-4 shadow rounded text-center mb-5"
          >
            <h2 className="fw-bold mb-4">🚀 How It Works?</h2>
            <div className="row mt-3">
              {[
                {
                  icon: "fas fa-user-plus",
                  step: "Step 1: Sign Up",
                  desc: "Create an account instantly.",
                  color: "text-primary",
                },
                {
                  icon: "fas fa-user-cog",
                  step: "Step 2: Choose Your Role",
                  desc: "Select Author, User, or Admin.",
                  color: "text-success",
                },
                {
                  icon: "fas fa-book-reader",
                  step: "Step 3: Start Writing & Reading",
                  desc: "Engage with the community & share knowledge.",
                  color: "text-danger",
                },
              ].map((step, index) => (
                <div key={index} className="col-md-4">
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <i className={`${step.icon} fa-2x ${step.color}`}></i>
                    <h5 className="mt-2">{step.step}</h5>
                    <p className="text-muted">{step.desc}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {isSignedIn && user && (
        <div>
          <div className="d-flex justify-content-evenly align-items-center bg-secondary p-3 mt-4 mx-4 me-4">
            <img
              src={user.imageUrl}
              width="100px"
              className="rounded-circle "
              alt=""
            />
            <p className="display-6 fw-bold">{user.firstName}</p>
          </div>
          <p className="lead fw-bold mt-3 mb-4 mx-4">Select Role</p>
          {error && (
            <p
              className="text-danger fs-5"
              style={{ fontFamily: "sans-serif" }}
            >
              {error}
            </p>
          )}
          <div className="d-flex role-radio p-5 justify-content-center mx-5 me-5">
            <div className="form-check me-4 mx-4 border border-2 border-black">
              <input
                type="radio"
                name="role"
                value="author"
                id="author"
                className="form-check-input"
                onChange={onSelectRole}
                required
              />
              <label
                htmlFor="author"
                className="form-check-label ms-2 mx-4 fw-bold"
              >
                Author
              </label>
              <div>
                <iframe
                  src="https://lottie.host/embed/3d0848db-1f22-4c71-87b6-6499e3b8027a/HZEINSyeHP.lottie"
                  className="cv"
                ></iframe>
              </div>
            </div>
            <div className="form-check me-4  border border-2 border-black mx-4">
              <input
                type="radio"
                name="role"
                value="user"
                id="user"
                className="form-check-input"
                onChange={onSelectRole}
                required
              />
              <label
                htmlFor="user"
                className="form-check-label ms-2 mx-4 fw-bold"
              >
                User
              </label>
              <div>
                <iframe src="https://lottie.host/embed/eb5f5c6e-09dc-4007-b49c-f8c92f842ba1/ObMGVBoc5H.lottie"></iframe>
              </div>
            </div>
            <div className="form-check border border-2 border-black mx-4">
              <input
                type="radio"
                name="role"
                value="admin"
                id="admin"
                className="form-check-input"
                onChange={onSelectRole}
                required
              />
              <label
                htmlFor="admin"
                className="form-check-label ms-2 mx-4 fw-bold"
              >
                Admin
              </label>
              <div>
                <iframe src="https://lottie.host/embed/2046b043-e591-4039-b38b-b86dc9fcb133/0zC03j04rb.lottie"></iframe>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
