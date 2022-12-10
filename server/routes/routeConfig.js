const express = require("express");
const _controllers = require("../controllers/controllerConfig");
const router = express.Router();

// route handlers
// @route GET && POST - /AALHRIA

// login
router.route("/login").post(_controllers.login);

// fetch login status
router
  .route("/isloggedin")
  .get(_controllers.verifyJWT, _controllers.loginStatus);

// add staff members
/*
router
  .route("/register")
  .post(_controllers.verifyJWT, _controllers.registerStaff);
  */

/*

// create
router.route("/insert").post(_controllers.insertNewName);

// read
router.route("/getAll").get(_controllers.getAllData);

// update
router.route("/update").patch(_controllers.updateNameById);

// delete
router.route("/delete/:id").delete(_controllers.deleteRowById);

// search
router.route("/search/:name").get(_controllers.searchByName);

*/

module.exports = router;
