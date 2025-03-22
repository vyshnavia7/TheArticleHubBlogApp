const userAuthor = require("../models/userAuthorModel");
async function createUserOrAuthor(req, res) {
  //business logic to create user/author
  //get user/author object from req
  const newuserAuthor = req.body;
  // console.log(userAuthor); //undefined use body parser
  //find user by email id
  const userInDb = await userAuthor.findOne({ email: newuserAuthor.email });
  //if user/author existed
  if (userInDb != null) {
    //check with role
    if (newuserAuthor.role === userInDb.role) {
      res.status(200).send({ message: newuserAuthor.role, payload: userInDb });
    } else {
      res.status(200).send({ message: "Invalid role" });
    }
  } else {
    let newUser = new userAuthor(newuserAuthor);
    let newUserOrAuthorDoc = await newUser.save();
    res
      .status(201)
      .send({ message: newUserOrAuthorDoc.role, payload: newUserOrAuthorDoc });
  }
}

module.exports = createUserOrAuthor;
