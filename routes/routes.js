const express = require("express");
const router = express.Router();
const handleControllers = require("../controllers/controllers");
const { body } = require("express-validator");
const User = require("../models/users");
const { Op } = require("sequelize");
// route to show welcome
router.get("/", handleControllers.handleHome);
// route to show form
router.get("/create", handleControllers.handleFormScreen);
// route to add a user
router.post(
  "/add",
  [
    // validate firstname if it is alphabetic only without white space
    body("firstuserName")
      .isAlpha()
      .withMessage("First Name should be alphabetic")
      .custom((value, { req }) => {
        // checking if user name exist with same first and last name
        return User.findOne({
          where: { firstname: value, lastname: req.body.lastuserName },
        })
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
    // check last name if alphabetic no need to check if user exist as we already done it
    body("lastuserName")
      .isAlpha()
      .withMessage("Last Name should be alphabetic"),
    // check if userprofile pic is url
    body("userProfile").isURL().withMessage("Profile should be URL"),
  ],
  handleControllers.handleCreate
);
// show all users
router.get("/users", handleControllers.handleUsers);
// delete a user
router.get("/delete/:id", handleControllers.deleteUser);
//  show edit form
router.get("/edit/:id", handleControllers.editUser);
// edit user validation to check user should not edit same name that already exist
router.post(
  "/edit/:id",
  [
    body("firstuserName")
      .isAlpha()
      .withMessage("First Name should be alphabetic")
      .custom((value, { req }) => {
        return User.findOne({
          where: {
            firstname: value,
            lastname: req.body.lastuserName,
            id: {
              [Op.ne]: parseInt(req.params.id),
            },
          },
        })
          .then((user) => {
            if (user) {
              return Promise.reject("User already exist");
            }
            return true;
          })
          .catch((err) => {
            throw new Error(err);
          });
      }),
    body("lastuserName")
      .isAlpha()
      .withMessage("Last Name should be alphabetic"),

    body("userProfile").isURL().withMessage("Profile should be URL"),
  ],
  handleControllers.updateUser
);
// get all projects of a user
router.get("/projects/:id", handleControllers.handleProjects);
//create projects of user
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
//
// serve view project screen
router.get("/viewprojects/:id", handleControllers.getProjects);
// delete project of a user
router.get("/deleteproject/:id/:userId", handleControllers.deleteProject);

module.exports = router;
