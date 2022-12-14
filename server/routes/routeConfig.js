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
// .route("/register/:id")
//console.log(`Parameter: ${request.params.id}`);
router
  .route("/register")
  .post(_controllers.verifyJWT, _controllers.registerStaff);

// view staff members
router.route("/viewstaff").get(_controllers.verifyJWT, _controllers.viewStaff);
//.get(_controllers.viewStaff);

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
