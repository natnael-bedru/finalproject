// get the class
const dbService = require("../models/DbService");
const db = new dbService();
// JWT TOKEN
const jwt = require("jsonwebtoken");

// Cryptography
const bcrypt = require("bcrypt");
const saltRounds = 10;

const fs = require("fs");
const path = require("path");

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
        request.img = decoded.img;
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
        img,
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
          img,
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
    img: request.img,
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

exports.registerStaff = (request, response) => {
  var string = request.body.img;
  var imageName = "Unspecified/defaultPicture.png";
  if (string) {
    var regex = /^data:.+\/(.+);base64,(.*)$/;
    var matches = string.match(regex);
    var ext = matches[1];
    var data = matches[2];
    var buffer = Buffer.from(data, "base64");
    const role = ["Unspecified", "Admin", "Employee"];
    imageName =
      `${role[request.body.roleid]}/${request.body.firstName} ${
        request.body.middleName
      } ${request.body.lastName}-${new Date().getUTCSeconds()}.` + ext;

    fs.writeFileSync(`./uploads/staffImages/${imageName}`, buffer);
  }

  request.body.img = imageName;
  console.log(`Request Body: ${JSON.stringify(request.body)}`);
  bcrypt.hash(request.body.password, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.log(err);
    }
    request.body.password = hashedPassword;
    const result = db.registerStaff(request.body);
    result
      .then((data) => {
        // data = "fieldCount":0,"affectedRows":1,"insertId":32,"info":"","serverStatus":2,"warningStatus":0
        response.json({
          status: "success",
          affectedRows: data.affectedRows,
          message: `Staff member successfuly registered!`,
        });
      })
      .catch((err) => {
        //Controller ERROR : {"code":"ER_DUP_ENTRY","message":"staff.name_UNIQUE"}
        //
        // HTTP errors say something about the HTTP protocol.
        // This specific error indicates a server is trying to relay the HTTP request,
        // but the upstream server did not respond correctly.

        // Your web application communicating with a database server is outside the realm of HTTP
        // and any errors should be wrapped in the generic HTTP 500 Internal server error response code.
        response.json({
          status: "fail",
          errorcode: err.code,
          message: `The ${err.message} already in use.`,
        });
      });
  });
};

//viewallstaff
exports.viewAllStaff = (request, response) => {
  const result = db.viewAllStaff(request.assignedBy, request.userId);
  result.then(async (data) => {
    // console.log(`User ID: ${request.userId}`);
    // response.send(JSON.stringify(data));
    var jsonObj = [];
    for (let x in data) {
      if (data[x].id !== request.userId) {
        // this
        const retriveRole = db.retriveRole(data[x].roleid);
        const re = await retriveRole;
        const view = {
          id: data[x].id,
          img: data[x].img,
          name: `${data[x].firstName} ${data[x].middleName} ${data[x].lastName}`,
          roleName: re[0].rolename,
          accountStatus: data[x].accountStatus,
          joinedDate: data[x].joinedDate,
        };
        jsonObj.push(view);
      }
    }
    response.json(jsonObj);
  });
};

exports.viewStaff = (request, response) => {
  //console.log(`Parameter: ${request.params.id}`);
  // console.log(`Parameter: ${request.assignedBy}`);
  // roleid img assignedBy firstName middleName lastName username accountStatus email phoneNumber sex birthday residentAddress joinedDate adminName roleName
  const result = db.viewStaff(request.params.id);
  result
    .then(async (data) => {
      //console.log(`Result: ${JSON.stringify(data[0].assignedBy)}`);
      var temp = JSON.stringify(data).toString();
      const retriveAdminName = db.retriveAdminName(data[0].assignedBy);
      const re = await retriveAdminName;
      // <== this function converts the assignedBy value to its refering name in the table called staff
      // removes the last part of the string json variable of data i.e( }] )
      temp = temp.slice(0, -2);
      // console.log(`Status: ${JSON.stringify(re.status)}`);
      if (re.status === "NULL") temp += `,"adminName":"NULL"}]`;
      else temp += `,"adminName":"${re[0].firstName} ${re[0].middleName}"}]`;
      data = JSON.parse(temp);
      return data;
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
    .then((data) => {
      if (request.assignedBy === data.assignedBy || "null") {
        // console.log(data);
        response.json(data);
      } else {
        // error You are not the supervisor of this employee
      }
    });
};

//viewAllOwner
exports.viewAllOwner = (request, response) => {
  const result = db.viewAllOwner(request.assignedBy, request.userId);
  result.then(async (data) => {
    // console.log(`User ID: ${request.userId}`);
    // response.send(JSON.stringify(data));
    // var jsonObj = [];
    // for (let x in data) {
    //   if (data[x].id !== request.userId) {

    //     const retriveRole = db.retriveRole(data[x].roleid);
    //     const re = await retriveRole;
    //     const view = {
    //       id: data[x].id,
    //       img: data[x].img,
    //       name: `${data[x].firstName} ${data[x].middleName} ${data[x].lastName}`,
    //       roleName: re[0].rolename,
    //       accountStatus: data[x].accountStatus,
    //       joinedDate: data[x].joinedDate,
    //     };
    //     jsonObj.push(view);
    //   }
    // }
    for (let x in data) {
      console.log(data[x].woredaId);
    }
    const retrieveSubCity = db.retriveWoredaInfo(data[0].woredaId);
    retrieveSubCity.then((result) => {
      console.log("------");
      console.log(result);
      console.log("------");
    });
    //response.json(data);
  });
};

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
