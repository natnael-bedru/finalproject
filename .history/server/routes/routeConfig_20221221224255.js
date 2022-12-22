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

// view all staff members
router
  .route("/viewallstaff")
  .get(_controllers.verifyJWT, _controllers.viewAllStaff);

// view staff member
router
  .route("/viewstaff/:id")
  .get(_controllers.verifyJWT, _controllers.viewStaff);

//viewallowner
router
  .route("/viewallowner")
  .get(_controllers.verifyJWT, _controllers.viewAllOwner);

//viewowner
router
  .route("/viewowner/:id")
  .get(_controllers.verifyJWT, _controllers.viewOwner);

// registerLand
router
  .route("/registerLand")
  .post(_controllers.verifyJWT, _controllers.registerLand);

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
