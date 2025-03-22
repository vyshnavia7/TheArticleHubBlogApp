const mongoose = require("mongoose");

//define user or author schema
const userAuthorSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      // required:true its optional
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profileImageUrl: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { strict: true },
);

//create model for user author schema
const UserAuthor = mongoose.model("userauthor", userAuthorSchema); //for creating pluralized collection of user & author

//export
module.exports = UserAuthor;
