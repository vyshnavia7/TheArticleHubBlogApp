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

userApp.get("/article/:articleId", async (req, res) => {
  try {
    const articleId = req.params.articleId;
    
    // Find the article by ID
    const article = await Article.findById(articleId);
    
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    // Send back the article with its comments
    res.status(200).json({ message: "Article fetched successfully", payload: article });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching article" });
  }
});

//create new user
userApp.post("/user", expressAsyncHandler(createUserOrAuthor));


//add comment(it is put req)
userApp.put('/comment/:articleId',expressAsyncHandler(async(req,res)=>{
  //get comment obj
  const commentObj=req.body
  console.log(commentObj);
  //add comment obj to comments array of article
  const articleWithComments=await Article.findOneAndUpdate({articleId:req.params.articleId},{$push:{comments:commentObj}},{returnOriginal:false})
  //send res
  res.status(200).send({message:"Comment Added",payload:articleWithComments})

}))

//delete comment
userApp.delete('/comment/:articleId/:commentId',expressAsyncHandler(async(req,res)=>{
  const {articleId,commentId}=req.params;
  try{
      const updatedArticle = await Article.findOneAndUpdate(
          { articleId },
          { $pull: { comments: { _id: commentId } } }, // Remove the comment from the array
          { returnOriginal: false }
      );

      if (!updatedArticle) {
          return res.status(404).send({ message: "Article not found" });
      }

      res.send({ message: "comment deleted", payload: updatedArticle });
  }catch(error){
      res.status(500).send({message:"Error deleting comment",error:error.message})
  }
}))



module.exports=userApp;