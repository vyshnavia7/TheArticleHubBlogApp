import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { userAuthorContextObj } from "../../contexts/UserAuthorContext";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdRestore } from "react-icons/md";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

function ArticleByID() {
  const { state } = useLocation();
  const { currentUser } = useContext(userAuthorContextObj);
  const { getToken } = useAuth();
  const [editArticleStatus, setEditArticleStatus] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [currentArticle, setCurrentArticle] = useState(state);
  const [commentStatus, setCommentStatus] = useState("");

  function enableEdit() {
    setEditArticleStatus(true);
  }

  async function onSave(modifiedArticle) {
    const articleAfterChanges = { ...state, ...modifiedArticle };
    const token = await getToken();

    articleAfterChanges.dateOfModification = new Date().toLocaleDateString();

    let res = await axios.put(
      `http://localhost:3000/author-api/article/${articleAfterChanges.articleId}`,
      articleAfterChanges,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data.message === "article modified") {
      setEditArticleStatus(false);
      setCurrentArticle(res.data.payload);
      navigate("/author-profile/:email/articles", {
        state: res.data.payload,
      });
    }
  }

  async function deleteArticle() {
    state.isArticleActive = false;
    let res = await axios.put(
      `http://localhost:3000/author-api/articles/${state.articleId}`,
      state
    );
    if (res.data.message === "article deleted/restored") {
      setCurrentArticle(res.data.payload);
    }
  }

  async function restoreArticle() {
    state.isArticleActive = true;
    let res = await axios.put(
      `http://localhost:3000/author-api/articles/${state.articleId}`,
      state
    );
    if (res.data.message === "article deleted/restored") {
      setCurrentArticle(res.data.payload);
    }
  }

  async function addComment(commentObj) {
    commentObj.nameOfUser = currentUser.firstName;
    let res = await axios.put(
      `http://localhost:3000/user-api/comment/${currentArticle.articleId}`,
      commentObj
    );
    if (res.data.message === "comment added") {
      setCurrentArticle((p) => ({
        ...p,
        comments: [...p.comments, res.data.payload],
      }));
      setCommentStatus(res.data.message);
      reset();
    }
  }
  async function deleteComment(commentId) {
    const token = await getToken();
    let res = await axios.put(
      `http://localhost:3000/user-api/comments/${commentId}`,
      { commentId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.data.message === "Comment deleted") {
      setCurrentArticle((prevArticle) => ({
        ...prevArticle,
        comments: prevArticle.comments.filter(
          (comment) => comment._id !== commentId
        ),
      }));
    }
  }

  return (
    <div>
      {!editArticleStatus ? (
        <>
          <div className="d-flex justify-content-between mt-4">
            <div className=" container mb-5 author-block w-100 px-4 py-2 rounded-2 d-flex justify-content-between align-items-center">
              <div className="hdr">
                <p className="display-5 me-4 title fw-bold">{state.title}</p>
                <div className="py-3 d-flex">
                  <small className="text-secondary me-4 fw-bold">
                    Created on: {state.dateOfCreation}
                  </small>
                  <small className="text-secondary me-4 fw-bold">
                    Modified on: {state.dateOfModification}
                  </small>
                </div>
              </div>
              <div className="author-details text-center">
                <img
                  src={state.authorData.profileImageUrl}
                  width="30"
                  height="30"
                  className="rounded-circle"
                  alt=""
                />
                <p className="fw-bold mt-2">{state.authorData.nameOfAuthor}</p>
              </div>
            </div>

            {currentUser.role === "author" && (
              <div className="d-flex me-2 xy">
                <button
                  className="me-2 btn btn-light  deleditbtns mt-5"
                  onClick={enableEdit}
                >
                  <FaEdit className="text-warning" />
                </button>
                {state.isArticleActive ? (
                  <button
                    className="me-2 btn btn-light deleditbtns mt-5"
                    onClick={deleteArticle}
                  >
                    <MdDelete className="text-danger fs-4" />
                  </button>
                ) : (
                  <button
                    className="me-2 btn btn-light"
                    onClick={restoreArticle}
                  >
                    <MdRestore className="text-info fs-4" />
                  </button>
                )}
              </div>
            )}
          </div>
          <p
            className="cont mt-3 article-content"
            style={{ whiteSpace: "pre-line" }}
          >
            {state.content}
          </p>
          {/* Render comments */}
          <div className="comments-section">
            <p className="fw-bold mx-5 fs-4">Comments</p>
            {currentArticle?.comments && currentArticle?.comments.length > 0 ? (
              currentArticle?.comments?.map((commentObj) => (
                <div
                  key={commentObj._id}
                  className="mb-3 p-2 mx-5 me-5 border-black animated-border border-2 w-50 commbox"
                >
                  <div className="d-flex">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/12225/12225881.png"
                      width="40"
                      height="40"
                      className="rounded-circle"
                      alt=""
                    />
                    <p className="user-name fw-bold mx-2 mt-2">
                      {commentObj.nameOfUser}
                    </p>
                  </div>
                  <p className="comment mx-5 lead">{commentObj.comment}</p>
                  {currentUser.role === "user" &&
                    currentUser.firstName === commentObj.nameOfUser && (
                      <button
                        className="btn btn-danger fw-bold mx-5"
                        onClick={() => deleteComment(commentObj._id)}
                      >
                        <MdDelete className="fs-4 text-white fw-bold" />
                        Delete
                      </button>
                    )}
                </div>
              ))
            ) : (
              <p className="mx-5">No comments yet..</p>
            )}
          </div>
          <h6>{commentStatus}</h6>
          {currentUser.role === "user" && (
            <form onSubmit={handleSubmit(addComment)}>
              <p className="mx-5 fw-medium mt-4 fs-5">Add Comments</p>
              <input
                type="text"
                {...register("comment")}
                className="form-control mb-4 mx-5 me-5 w-50"
              />
              <button className="btn btn-success mx-5 fw-bold">
                Add a Comment
              </button>
            </form>
          )}
        </>
      ) : (
        <form
          onSubmit={handleSubmit(onSave)}
          className="mb-4 w-50 mt-5 mx-auto formsub"
        >
          <div className="mb-4">
            <label htmlFor="title" className="form-label fw-bold">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              defaultValue={state.title}
              {...register("title")}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="form-label fw-bold">
              Select a category
            </label>
            <select
              {...register("category")}
              id="category"
              className="form-select w-auto"
              defaultValue={state.category}
            >
              <option value="programming">Programming</option>
              <option value="AI&ML">AI&ML</option>
              <option value="database">Database</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="content" className="form-label fw-bold">
              Content
            </label>
            <textarea
              {...register("content")}
              className="form-control"
              id="content"
              rows="10"
              defaultValue={state.content}
            ></textarea>
          </div>

          <div className="text-end">
            <button type="submit" className="btn btn-success fw-bold">
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ArticleByID;
