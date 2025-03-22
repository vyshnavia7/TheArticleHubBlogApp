const exp = require("express");
const authorApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const createUserOrAuthor = require("./createUserorAuthor");
const Article = require("../models/articleModel");
const { requireAuth } = require("@clerk/express");
require("dotenv").config();

//API

//create new author
authorApp.post(
  "/author",
  expressAsyncHandler(createUserOrAuthor),
  //logic to create author
);

//create new article
authorApp.post(
  "/article",
  expressAsyncHandler(async (req, res) => {
    //get new article obj from req
    const newArticleObj = req.body;
    const newArticle = new Article(newArticleObj);
    const articleObj = await newArticle.save();
    res.status(201).send({ message: "article published", payload: articleObj });
  }),
);

//read all articles
authorApp.get(
  "/articles/:category",
  requireAuth({ signInUrl: "unauthorized" }),
  expressAsyncHandler(async (req, res) => {
    //read all articles from db
    const par = req.params.category;
    const com =
      par === "all"
        ? { isArticleActive: true }
        : { isArticleActive: true, category: par };
    const listOfArticles = await Article.find(com); //it should read only existing articles,not deleted ones
    res.status(200).send({ message: "articles", payload: listOfArticles });
  }),
);

authorApp.get("/unauthorized", (req, res) => {
  res.send({ message: "Unauthorized request" });
});
//modify an article by article id
authorApp.put(
  "/article/:articleId",
  requireAuth({ signInUrl: "unauthorized" }),
  expressAsyncHandler(async (req, res) => {
    //get modified article
    const modifiedArticle = req.body;
    //update article by article id
    const latestArticle = await Article.findByIdAndUpdate(
      modifiedArticle._id,
      { ...modifiedArticle },
      { returnOriginal: false },
    );
    //send res
    res
      .status(200)
      .send({ message: "article modified", payload: latestArticle });
  }),
);

//delete(soft delete) an article by article id
authorApp.put(
  "/articles/:articleId",
  expressAsyncHandler(async (req, res) => {
    //get modified article
    const modifiedArticle = req.body;
    //update article by article id
    const latestArticle = await Article.findByIdAndUpdate(
      modifiedArticle._id,
      { ...modifiedArticle },
      { returnOriginal: false },
    );
    //send res
    res
      .status(200)
      .send({ message: "article deleted/restored", payload: latestArticle });
  }),
);
module.exports = authorApp;
