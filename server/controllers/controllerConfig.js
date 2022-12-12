// get the class
const dbService = require("../models/DbService");
const db = new dbService();
// JWT TOKEN
const jwt = require("jsonwebtoken");

// Cryptography
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.verifyJWT = (request, response, next) => {
  const token = request.headers["x-access-token"];
  if (!token) {
    response.status(401).send("Token is Required");
    //response.status(401).send("Token is required!");
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        response.json({ auth: false, message: "Authentication Failure!" });
      } else {
        //console.log(`Decoded :${JSON.stringify(decoded)}`);
        request.userId = decoded.id;
        request.roleName = decoded.roleName;
        request.assignedBy = decoded.assignedBy;
        request.adminName = decoded.adminName;
        request.firstName = decoded.firstName;
        request.middleName = decoded.middleName;
        request.lastName = decoded.lastName;
        request.username = decoded.username;
        request.email = decoded.email;
        request.phoneNumber = decoded.phoneNumber;
        request.sex = decoded.sex;
        request.birthday = decoded.birthday;
        next();
      }
    });
  }
};

// route callback functions

exports.login = (request, response) => {
  const { username, password } = request.body;
  const result = db.login(username, password);
  result
    .then((data) => {
      return new Promise((resolve, reject) => {
        // this checks whether the password entered and the database hashed password match
        bcrypt.compare(password, data[0].password, (err, resp) => {
          if (resp) {
            // it its successfull it passes the data on to the next then function
            resolve(data);
          } else {
            // wrong password
            reject(
              // alternative : Invalid Username or Password!
              new Error("You have entered an invalid username or password!")
            );
          }
        });
      });
    })
    .then(async (data) => {
      var temp = JSON.stringify(data).toString();
      const retriveRole = db.retriveRole(data[0].roleid);

      const re = await retriveRole;
      // <== this function adds role value in litteral form
      // removes the last part of the string json variable of data i.e( }] )
      temp = temp.slice(0, -2);
      temp += `,"roleName":"${re[0].rolename}"}]`;
      data = JSON.parse(temp);
      return data;
    })
    .then(async (data) => {
      //console.log(`Result: ${JSON.stringify(data[0].assignedBy)}`);
      var temp = JSON.stringify(data).toString();
      const retriveAdminName = db.retriveAdminName(data[0].assignedBy);
      const re = await retriveAdminName;
      // <== this function converts the assignedBy value to its refering name in the table called staff
      // removes the last part of the string json variable of data i.e( }] )
      temp = temp.slice(0, -2);
      console.log(`Status: ${JSON.stringify(re.status)}`);
      if (re.status === "NULL") temp += `,"adminName":"NULL"}]`;
      else temp += `,"adminName":"${re[0].firstName} ${re[0].middleName}"}]`;
      data = JSON.parse(temp);
      return data;
    })
    .then((data) => {
      console.log(`Result: ${JSON.stringify(data[0])}`);
      // this part creates the jwt token with the data variable
      console.log(`Data: ${data[0].roleName}`);
      const {
        id,
        assignedBy,
        firstName,
        middleName,
        lastName,
        email,
        phoneNumber,
        sex,
        birthday,
        username,
        roleName,
        adminName,
      } = data[0];
      const token = jwt.sign(
        {
          id,
          assignedBy,
          firstName,
          middleName,
          lastName,
          email,
          phoneNumber,
          sex,
          birthday,
          username,
          roleName,
          adminName,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: 86400, // 1 day [value in seconds ]
        }
      );
      response.json({ auth: true, token: token, data: data });
    })
    .catch((err) => {
      console.error(`${err}`);
      response.json({ auth: false, message: err.message });
    });
};

//loginStatus
exports.loginStatus = (request, response) => {
  // attempted to shorten code
  // error => TypeError: Converting circular structure to JSON
  console.log(`User ID : ${request.userId}`);
  console.log(`User name : ${request.username}`);
  console.log(`User role : ${request.roleName}`);
  console.log(`Admin name : ${request.adminName}`);
  response.json({
    loggedIn: true,
    userId: request.userId,
    username: request.username,
    assignedBy: request.assignedBy,
    adminName: request.adminName,
    roleName: request.roleName,
    firstName: request.firstName,
    middleName: request.middleName,
    lastName: request.lastName,
    email: request.email,
    phoneNumber: request.phoneNumber,
    sex: request.sex,
    birthday: request.birthday,
    message: "You are authenticated!",
  });
};
/*
exports.registerStaff = (request, response) => {
  //console.log(request.body);
  const { name } = request.body;
  const db = dbService.getDbServiceInstance();
  const result = db.insertNewName(name);

  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
};
*/
/*

exports.insertNewName = (request, response) => {
  //console.log(request.body);
  const { name } = request.body;
  const db = dbService.getDbServiceInstance();
  const result = db.insertNewName(name);

  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
};
exports.getAllData = (request, response) => {
  const db = dbService.getDbServiceInstance();
  const result = db.getAllData();
  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
};
exports.updateNameById = (request, response) => {
  const { id, name } = request.body;
  const db = dbService.getDbServiceInstance();
  const result = db.updateNameById(id, name);
  result
    .then((data) => response.json({ success: data }))
    .catch((err) => console.log(err));
};
exports.deleteRowById = (request, response) => {
  // console.log(request.params); displays the id to be deleted in the back end
  const { id } = request.params;
  const db = dbService.getDbServiceInstance();
  const result = db.deleteRowById(id);
  result
    .then((data) => response.json({ success: data }))
    .catch((err) => console.log(err));
};
exports.searchByName = (request, response) => {
  const { name } = request.params;
  const db = dbService.getDbServiceInstance();
  const result = db.searchByName(name);
  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
};
*/
