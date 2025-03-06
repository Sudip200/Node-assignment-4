const express = require("express");
const router = express.Router();
const handleControllers = require("../controllers/controllers");
const { body } = require("express-validator");
const User = require("../models/users");
router.get("/", handleControllers.handleHome);
router.get("/form", handleControllers.handleFormScreen);
router.post(
  "/add",
  [
    body("userName")
      .isAlpha("en-US", { ignore: " " })
      .withMessage("Name should be alphabetic")
      .custom((value) => {
        return User.findOne({ where: { name: value } })
          .then((user) => {
            if (user) {
              return Promise.reject("User already exists");
            }
            return true;
          })
          .catch((err) => {
            throw new Error(err);
          });
      }),
    body("userProfile").isURL().withMessage("Profile should be URL"),
  ],
  handleControllers.handleCreate
);
router.get("/users", handleControllers.handleUsers);
router.get("/delete/:id", handleControllers.deleteUser);
router.get("/edit/:id", handleControllers.editUser);
router.post(
  "/edit/:id",
  [
    body("userName")
      .isAlpha("en-US", { ignore: " " })
      .withMessage("Name should be alphabetic")
      .custom((value, { req }) => {
        return User.findOne({
          where: { name: value, id: { $ne: parseInt(req.params.id) } },
        })
          .then((user) => {
            console.log(user);
            if (user) {
              return Promise.reject("User already exists");
            }
            return true;
          })
          .catch((err) => {
            throw new Error(err);
          });
      }),
    body("userProfile").isURL().withMessage("Profile should be URL"),
  ],
  handleControllers.updateUser
);
router.get("/projects/:id", handleControllers.handleProjects);
router.post(
  "/createproject/:id",
  [
    body("title")
      .isLength({ max: 50 })
      .withMessage("Title should be maximum 50 characters"),
    body("description")
      .isLength({ max: 100 })
      .withMessage("Description should be maximum 100 characters"),
  ],
  handleControllers.createProject
);
router.get("/viewprojects/:id", handleControllers.getProjects);
router.get("/deleteproject/:id/:userId", handleControllers.deleteProject);

module.exports = router;
