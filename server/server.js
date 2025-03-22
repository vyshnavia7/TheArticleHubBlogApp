const exp = require("express");
const app = exp();
require("dotenv").config(); //takes all variables from .env file & makes them available for processing
const mongoose = require("mongoose");
const userApp = require("./APIs/userApi");
const authorApp = require("./APIs/authorApi");
const adminApp = require("./APIs/adminApi");
const port = process.env.PORT || 5000;
mongoose
  .connect(process.env.DBURL)
  .then(() => {
    app.listen(port, () => console.log(`server listening on port ${port}..`));
    console.log("db connection success");
  })
  .catch((err) => console.log("error in db connection", err));
const cors = require("cors");
app.use(cors());
//body parser middleware
app.use(exp.json());
//connect API routes
app.use("/user-api", userApp);
app.use("/author-api", authorApp);
app.use("/admin-api", adminApp);

//error handler middleware
app.use((err, req, res, next) => {
  console.log("err obj in express error handler: ", err);
  res.send({ message: err.message });
});
