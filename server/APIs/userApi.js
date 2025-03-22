const exp = require("express");
const userApp = exp.Router();
// Extract Types
const { ObjectId } = require("mongodb"); // Extract ObjectId
const UserAuthor = require("../models/userAuthorModel");
const expressAsyncHandler = require("express-async-handler");
const createUserOrAuthor = require("./createUserorAuthor");
const Article = require("../models/articleModel");

//API
// userApp.get("/users",async(req,res)=>{
//     //get user
//     let usersList=await UserAuthor.find();
//     res.send({message:"users",paylohttp://localhost:5173/ad:usersList})
// })

//create new user
userApp.post("/user", expressAsyncHandler(createUserOrAuthor));

//add comment
userApp.put(
  "/comment/:articleId",
  expressAsyncHandler(async (req, res) => {
    //get comment obj
    const commentObj = req.body;
    console.log(commentObj, req.params.articleId);
    //add comment obj to comments array of article
    const articleWithComments = await Article.findOneAndUpdate(
      { articleId: req.params.articleId }, //condtion
      { $push: { comments: commentObj } }, //pushed to comments array
      { returnOriginal: false },
    ); //returns latest doc
    res
      .status(200)
      .send({ message: "added comment", payload: articleWithComments });
  }),
);

//delete comment
userApp.put(
  "/comments/:commentId",
  expressAsyncHandler(async (req, res) => {
    const comId = req.params.commentId;
    if (!ObjectId.isValid(comId)) {
      return res.status(400).json({ error: "Invalid Comment ID format" });
    }
    const r = await Article.findOneAndUpdate(
      {
        "comments._id": new ObjectId(comId),
      },
      { $pull: { comments: { _id: new ObjectId(comId) } } },
      { new: true },
    );
    if (!r) {
      return res
        .status(404)
        .json({ message: "Comment not found or already deleted" });
    }
    res.json({ message: "Comment deleted", payload: r });
  }),
);

module.exports = userApp;
