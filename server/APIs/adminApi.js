const exp = require("express");
const admin = require("../models/userAuthorModel");
const expressAsyncHandler = require("express-async-handler");
const createUserOrAuthor = require("./createUserorAuthor");
const adminApp = exp.Router();

adminApp.post(
  "/users",
  expressAsyncHandler(createUserOrAuthor),
  //logic to create author
);
adminApp.post("/users", async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const existingAdmin = await admin.findOne({ email, role: "admin" });
    if (existingAdmin) {
      return res.status(400).send({ message: "Admin already exists" });
    }
    const newAdmin = new admin({
      firstName,
      lastName,
      email,
      role: "admin",
      isBlocked: false,
    });
    await newAdmin.save();
    res.status(201).send({ message: "admin", payload: newAdmin });
  } catch (err) {
    res.status(500).send({ message: "Error creating admin" });
  }
});

adminApp.get("/users", async (req, res) => {
  try {
    const users = await admin.find();
    res.status(200).send({ message: "Users & Authors", payload: users });
  } catch (err) {
    res.status(500).send({ message: "Error fetching users" });
  }
});

adminApp.put("/users/block/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { isBlocked } = req.body;

    const user = await admin.findById(id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    user.isBlocked = isBlocked;
    await user.save();
    res.status(200).send({ message: "User status updated", payload: user });
  } catch (err) {
    res.status(500).send({ message: "Error updating user" });
  }
});

module.exports = adminApp;
