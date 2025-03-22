import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  //dropdown articles content
  const [categories, setCategories] = useState([
    "programming",
    "AI&ML",
    "database",
  ]);
  const [cat, setCat] = useState("all");
  //  function handleFilterChange(category){
  //   setCategory(category);
  //  };
  // const filteredArticles=articles.filter(
  //   (art)=>category==="All" || art.category===category
  // );

  //get all articles(gets called when component is loaded)
  //fetching data from backend
  async function getArticles() {
    //get jwt token
    const token = await getToken();
    //make authenticated req
    let res = await axios.get(`${BACKEND_URL}/author-api/articles/${cat}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.data.message === "articles") {
      setArticles(res.data.payload);
    } else {
      setError(res.data.message);
    }
  }

  //go to specific article
  function gotoArticleById(articleObj) {
    navigate(`/articles/${articleObj.articleId}`, { state: articleObj }); //we can also pass state property to display articleObj
  }

  useEffect(() => {
    getArticles();
  }, [cat]);

  // console.log(articles);
  return (
    <div>
      <div className="container my-4">
        {error.length != 0 && (
          <p className="display-4 text-center mt-5 text-danger">{error}</p>
        )}
        <div className="dropdown mx-5 my-5">
          <label htmlFor="cat" className="mx-5 my-3 fw-bold">
            Select Category:{" "}
          </label>
          <select
            name=""
            id="cat"
            className="form-select"
            value={cat}
            onChange={(e) => setCat(e.target.value)}
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="all">All</option>
            <option value="programming">Programming</option>
            <option value="AI&ML">AI&ML</option>
            <option value="database">Database</option>
          </select>
        </div>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {articles.map((articleObj) => (
            <div className="col" key={articleObj.articleId}>
              <div className="card h-100  shadow-sm">
                <div className="card-body">
                  <div className="author-details text-end align-items-center gap-2 mb-2">
                    <img
                      src={articleObj.authorData.profileImageUrl}
                      width="40px"
                      className="rounded-circle"
                      alt=""
                    />
                    <p>
                      <small className="text-secondary">
                        {articleObj.authorData.nameOfAuthor}
                      </small>
                    </p>
                  </div>
                  <h5 className="card-title">{articleObj.title}</h5>

                  <p className="card-text">
                    {articleObj.content.substring(0, 80) + "...."}
                  </p>
                  <button
                    className="custom-btn btn-4"
                    onClick={() => gotoArticleById(articleObj)}
                  >
                    Read more
                  </button>
                </div>
                <div className="card-footer">
                  <small className="text-body-secondary">
                    Last updated on {articleObj.dateOfModification}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Articles;
