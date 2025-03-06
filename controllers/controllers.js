const User = require("../models/users");
const Project = require("../models/projects");
const { validationResult } = require("express-validator");
exports.handleHome = (req, res) => {
  return res.render("home");
};
exports.handleFormScreen = (req, res, next) => {
  return res.render("form", {
    message: "Create User",
    user: {
      firstname: "",
      lastname: "",
      profilePic: "",
      techStack: "",
    },
    route: "/add",
    errors: [],
  });
};
exports.handleCreate = (req, res, next) => {
  const firstname = req.body.firstuserName;
  const lastname = req.body.lastuserName;
  let profilePic = req.body.userProfile;
  const techStack = req.body.userTechStack;
  const errors = validationResult(req);
  if (profilePic === "") {
    profilePic =
      "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png";
  }
  if (errors.array().length > 0) {
    return res.render("form", {
      message: "Create User",
      user: {
        firstname: firstname,
        lastname: lastname,
        profilePic: profilePic,
        techStack: techStack,
      },
      route: "/add",
      errors: errors.array(),
    });
  }
  User.create({
    firstname: firstname,
    lastname: lastname,
    profilePic: profilePic,
    techStack: techStack,
  })
    .then(() => {
      return res.redirect("/users");
    })
    .catch((err) => {
      next(err);
    });
};
exports.handleUsers = (req, res, next) => {
  User.findAll()
    .then((users) => {
      return res.render("users", { users: users });
    })
    .catch((err) => {
      next(err);
    });
};
exports.deleteUser = (req, res, next) => {
  User.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.redirect("/users");
    })
    .catch((err) => {
      next(err);
    });
};
exports.editUser = (req, res, next) => {
  User.findByPk(req.params.id)
    .then((user) => {
      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        return next(error);
      }
      return res.render("form", {
        message: "Edit User",
        user: user,
        route: `/edit/${req.params.id}`,
        errors: [],
      });
    })
    .catch((err) => {
      next(err);
    });
};
exports.updateUser = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.render("form", {
      message: "Edit User",
      user: {
        firstname: req.body.firstuserName,
        lastname: req.body.lastuserName,
        profilePic: req.body.userProfile,
        techStack: req.body.userTechStack,
      },
      route: `/edit/${req.params.id}`,
      errors: errors.array(),
    });
  }

  User.update(
    {
      firstname: req.body.firstuserName,
      lastname: req.body.lastName,
      profilePic: req.body.userProfile,
      techStack: req.body.userTechStack,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then(() => {
      return res.redirect("/users");
    })
    .catch((err) => {
      next(err);
    });
};
exports.handleProjects = (req, res, next) => {
  return res.render("submitprojects", { id: req.params.id, errors: [] });
};
exports.createProject = (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const userId = req.params.id;
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.render("submitprojects", {
      id: userId,
      errors: errors.array(),
    });
  }
  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        return next(error);
      }
      return user.createProject({
        title: title,
        description: description,
      });
    })
    .then(() => {
      res.redirect("/users");
    })
    .catch((err) => {
      next(err);
    });
};
exports.getProjects = (req, res, next) => {
  User.findByPk(req.params.id, { include: "projects" })
    .then((user) => {
      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        return next(error);
      }
      return res.render("projects", {
        projects: user.projects,
        userId: req.params.id,
      });
    })
    .catch((err) => {
      next(err);
    });
};
exports.deleteProject = (req, res, next) => {
  Project.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.redirect("/viewprojects/" + req.params.userId);
    })
    .catch((err) => {
      next(err);
    });
};
