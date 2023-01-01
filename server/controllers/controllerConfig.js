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
const { json } = require("body-parser");

// This is Used for generating random id for when storing the file in server
function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
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
        //TODO: The token should be decoded better
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
        request.accountStatus = decoded.accountStatus;
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
        accountStatus,
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
          accountStatus,
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
    accountStatus: request.accountStatus,
    email: request.email,
    phoneNumber: request.phoneNumber,
    sex: request.sex,
    birthday: request.birthday,
    message: "You are authenticated!",
  });
};

exports.registerStaff = (request, response) => {
  //TODO:
  // the image is handled inthis
  var string = request.body.img;
  //console.log(request.body.img);
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
      } ${request.body.lastName}-[${new Date()
        .toISOString()
        .substring(0, 10)}][${makeid(5)}].` + ext;

    fs.writeFileSync(`./uploads/staffImages/${imageName}`, buffer);
  }

  request.body.img = imageName;
  //console.log(`Request Body: ${JSON.stringify(request.body)}`);
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
        // console.log("error form controller line 255");
        //console.log(err);
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
          lastChanged: data[x].lastChanged,
          joinedDate: data[x].joinedDate,
        };
        jsonObj.push(view);
      }
    }
    response.json(jsonObj);
  });
};

exports.viewStaff = (request, response) => {
  // console.log(`Parameter: ${request.params.id}`);
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
//NOTE: BETTER VERSION
exports.viewAllOwner = (request, response) => {
  const result = db.viewAllOwner();
  result.then(async (data) => {
    var jsonObj = [];
    for (let x in data) {
      const retrieveSubCity = db.retriveWoredaInfo(data[x].woredaId);
      await retrieveSubCity.then(async (alpha) => {
        const out = {
          id: data[x].id,
          img: data[x].img,
          fullName: `${data[x].firstName} ${data[x].middleName} ${data[x].lastName}`,
          // firstName: data[x].firstName,
          // middleName: data[x].middleName,
          // lastName: data[x].lastName,
          sex: data[x].sex,
          phonenumber: data[x].phonenumber,
          dateofbirth: data[x].dateofbirth,
          woredaNumber: alpha.woredaNumber,
          kebeleNumber: alpha.kebeleNumber,
          subCityName: alpha.subCityName,
        };
        jsonObj.push(out);
      });
    }
    response.json(jsonObj);
  });
};
//viewOwner
exports.viewOwner = (request, response) => {
  const result = db.viewOwner(request.params.id);
  result.then(async (data) => {
    var jsonObj = [];
    const retrieveSubCity = db.retriveWoredaInfo(data[0].woredaId);
    await retrieveSubCity.then((alpha) => {
      const out = {
        id: data[0].id,
        img: data[0].img,
        fullName: `${data[0].firstName} ${data[0].middleName} ${data[0].lastName}`,
        sex: data[0].sex,
        phonenumber: data[0].phonenumber,
        dateofbirth: data[0].dateofbirth,
        woredaNumber: alpha.woredaNumber,
        kebeleNumber: alpha.kebeleNumber,
        subCityName: alpha.subCityName,
      };
      jsonObj.push(out);
    });
    await response.json(jsonObj);
  });
};
//retriveWoredaInfo
exports.retriveAllWoredaInfo = (request, response) => {
  const retrieveSubCity = db.retriveAllWoredaInfo();
  retrieveSubCity.then((data) => {
    response.json(data);
  });
};
//registerLand
exports.registerLand = (request, response) => {
  var duplicate = false;
  // Retriving the Woreda Foreign-Key BEGINING
  /*
      console.log(`Woreda ${request.body.currentWoreda}`);
      console.log(`Kebele ${request.body.formerKebele}`);
    */
  const result = db.getWoredaKebeleId(
    request.body.currentWoreda,
    request.body.formerKebele
  );
  result.then((woredaId) => {
    /* console.log(woredaId); */
    // Retriving the Woreda Foreign-Key END

    // Checking For Duplicate Carta Information BEGINING
    const checkParameter = {
      citizenId: request.body.citizenId,
      woredaId: woredaId,
      blockNumber: request.body.blockNumber,
      parcelNumber: request.body.parcelNumber,
      houseNumber: request.body.houseNumber,
      plotArea: request.body.plotArea,
      builtUpArea: request.body.builtUpArea,
      basemapNo: request.body.basemapNo,
    };

    const chk = db.checkExistingLand(checkParameter);
    chk
      .then((check) => {
        if (check.length !== 0) {
          response.json({
            status: "fail",
            //errorcode: err.code,
            message: `Duplicate Carta Information! Please check your form!`,
          });
          duplicate = true;
          return duplicate;
        }
      })
      .then((duplicate) => {
        if (!duplicate) {
          // Checking For Duplicate Carta Information END
          // Registering the Coodrinate Data BEGINING
          const coodrinateData = {
            x1: parseFloat(request.body.x1),
            y1: parseFloat(request.body.y1),
            x2: parseFloat(request.body.x2),
            y2: parseFloat(request.body.y2),
            x3: parseFloat(request.body.x3),
            y3: parseFloat(request.body.y3),
            x4: parseFloat(request.body.x4),
            y4: parseFloat(request.body.y4),
            x5: parseFloat(request.body.x5),
            y5: parseFloat(request.body.y5),
          };
          //console.log(coodrinateData);
          const result1 = db.registerCoordinate(coodrinateData);
          result1.then((res) => {
            var coordinateId = null;
            var citizenFirstName = null;
            var citizenMiddleName = null;
            var citizenLastName = null;
            var imageName = null;
            if (res.affectedRows === 1) {
              coordinateId = res.insertId;
              // Registering the Coodrinate Data END
              // Fetching Citizen Name For Naming Carta Image BEGINING
              const result2 = db.viewOwner(request.body.citizenId);
              result2.then((citizen) => {
                citizenFirstName = citizen[0].firstName;
                citizenMiddleName = citizen[0].middleName;
                citizenLastName = citizen[0].lastName;
                // Fetching Citizen Name For Naming Carta Image END
                // Storing Image On Server BEGINING
                var string = request.body.img;
                var regex = /^data:.+\/(.+);base64,(.*)$/;
                var matches = string.match(regex);
                var ext = matches[1];
                var data = matches[2];
                var buffer = Buffer.from(data, "base64");
                imageName =
                  `${citizenFirstName} ${citizenMiddleName} ${citizenLastName}-[${
                    request.body.cartaIssuedDate
                  }][${makeid(5)}].` + ext;

                fs.writeFileSync(`./uploads/cartaImages/${imageName}`, buffer);
                // Storing Image On Server END
                // REGISTERING CARTA BEGINING
                const carta = {
                  citizenId: request.body.citizenId,
                  woredaId: woredaId,
                  img: imageName,
                  blockNumber: request.body.blockNumber,
                  parcelNumber: request.body.parcelNumber,
                  houseNumber: request.body.houseNumber,
                  plotArea: request.body.plotArea,
                  builtUpArea: request.body.builtUpArea,
                  landGrade: request.body.landGrade,
                  titleDeedNo: request.body.titleDeedNo,
                  cartaIssuedDate: request.body.cartaIssuedDate,
                  basemapNo: request.body.basemapNo,
                  registrationNo: request.body.registrationNo,
                  typeOfHolding: request.body.typeOfHolding,
                  coordinateId: coordinateId,
                  plannedLandUse: request.body.plannedLandUse,
                  permittedUse: request.body.permittedUse,
                  staffId: request.body.staffId,
                  lastModifiedBy: request.body.lastModifiedBy,
                  lastModifiedDate: request.body.lastModifiedDate,
                };
                const result3 = db.registerLand(carta);
                // console.log("Carta Registerd Successfully!");
                result3
                  .then((data) => {
                    // data = "fieldCount":0,"affectedRows":1,"insertId":32,"info":"","serverStatus":2,"warningStatus":0
                    response.json({
                      status: "success",
                      affectedRows: data.affectedRows,
                      message: `Carta registered successfuly!`,
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
                      message: `${err.message} Unable to register Carta!`,
                    });
                  });
                // REGISTERING CARTA END
              });
            } else {
              console.log("Error when inserting Co-ordinate for land!");
            }
          });
        }
      });
  });
};
//viewAllLand
exports.viewAllLand = (request, response) => {
  // console.log(`Parameter: ${request.params.id}`);
  const citizenId = request.params.id;
  var jsonOut = {
    citizenInfo: [],
    carta: [],
  };
  // GET CITIZEN INFORMATION BEGINING
  const result = db.viewOwner(citizenId);
  result.then((citizenData) => {
    var fullName = `${citizenData[0].firstName} ${citizenData[0].middleName} ${citizenData[0].lastName}`;
    var img = citizenData[0].img;
    var sex = citizenData[0].sex;
    var phoneNumber = citizenData[0].phonenumber;
    var dateOfBirth = citizenData[0].dateofbirth;

    // GET CITIZEN INFORMATION END
    // GET WOREDA INFORMATION BEGINING
    const result1 = db.retriveWoredaInfo(citizenData[0].woredaId);
    result1.then((woreda) => {
      // console.log("Woreda Information");
      var woredaNumber = woreda.woredaNumber;
      var kebeleNumber = woreda.kebeleNumber;
      var subCityName = woreda.subCityName;

      const citizenData = {
        fullName: fullName,
        img: img,
        sex: sex,
        phoneNumber: phoneNumber,
        dateOfBirth: dateOfBirth,
        woredaNumber: woredaNumber,
        kebeleNumber: kebeleNumber,
        subCityName: subCityName,
      };
      jsonOut.citizenInfo.push(citizenData);
      // GET WOREDA INFORMATION END
      // GET CARTA INFORMATION BEGINING
      const result3 = db.viewCarta(citizenId);
      result3
        .then(async (carta) => {
          //console.log("CARTA INFORMATION");
          if (carta) {
            for (let x in carta) {
              var result4 = db.retriveWoredaInfo(carta[x].woredaId);
              var woreda = await result4;
              var result5 = db.viewStaff(carta[x].staffId);
              var staff = await result5;
              var result6 = db.viewStaff(carta[x].lastModifiedBy);
              var staffLastModifiedBy = await result6;
              var result7 = db.getCoordinate(carta[x].coordinateId);
              var coordinateData = await result7;

              var cartaData = {
                cartaId: carta[x].id,
                currentWoredaNumber: woreda.woredaNumber,
                formerKebeleNumber: woreda.kebeleNumber,
                cartaSubCityName: woreda.subCityName,
                cartaImage: carta[x].img,
                cartaBlockNumber: carta[x].blockNumber,
                cartaParcelNumber: carta[x].parcelNumber,
                cartaHouseNumber: carta[x].houseNumber,
                cartaPlotArea: carta[x].plotArea,
                cartaBuiltUpArea: carta[x].builtUpArea,
                cartaLandGrade: carta[x].landGrade,
                cartaTitleDeedNo: carta[x].titleDeedNo,
                cartaIssuedDate: carta[x].cartaIssuedDate,
                cartaBasemapNo: carta[x].basemapNo,
                cartaRegistrationNo: carta[x].registrationNo,
                cartaTypeOfHolding: carta[x].typeOfHolding,
                cartaCoordinateData: [
                  {
                    X1: coordinateData[0].X1,
                    Y1: coordinateData[0].Y1,
                    X2: coordinateData[0].X2,
                    Y2: coordinateData[0].Y2,
                    X3: coordinateData[0].X3,
                    Y3: coordinateData[0].Y3,
                    X4: coordinateData[0].X4,
                    Y4: coordinateData[0].Y4,
                    X5: coordinateData[0].X5,
                    Y5: coordinateData[0].Y5,
                  },
                ],
                cartaPlannedLandUse: carta[x].plannedLandUse,
                cartaPermittedUse: carta[x].permittedUse,
                issuerStaffName: `${staff[0].firstName} ${staff[0].middleName}`,
                lastChanged: `${staffLastModifiedBy[0].firstName} ${staffLastModifiedBy[0].middleName}`,
                lastModifiedDate: carta[x].lastModifiedDate,
              };
              jsonOut.carta.push(cartaData);
            }
          }
        })
        .then(() => {
          // console.log(jsonOut);
          response.json(jsonOut);
        });
    });
  });
};
exports.updateStaff = async (request, response) => {
  // converting the JSON OBJECT TO ARRAY
  const objectToArray = (obj = {}) => {
    const res = [];
    const keys = Object.keys(obj);
    for (key of keys) {
      res.push([key, obj[key]]);
    }
    return res;
  };
  const requestArray2D = objectToArray(request.body);
  //requestArray2D[2][1] = "cope";
  //console.log(requestArray2D[2][1]);

  var header = null;
  var value = null;
  var update = [];
  for (let row in requestArray2D) {
    for (let col in requestArray2D[0]) {
      if (parseInt(col) === 0) {
        header = requestArray2D[parseInt(row)][parseInt(col)];
      }
      if (parseInt(col) === 1) {
        value = requestArray2D[parseInt(row)][parseInt(col)];
        if (value !== "") {
          if (
            parseInt(row) !== 0 // id
          ) {
            if (header === "password") {
              const resPassword = bcrypt.hash(value, saltRounds);
              const hashedPassword = await resPassword;
              update.push([header, hashedPassword]);
            } else {
              update.push([header, value]);
            }
          }
        }
      }
    }
  }
  const staffId = requestArray2D[0][1];
  if (update.length >= 4) {
    const result = db.updateStaff(update, staffId);
    //const data = await result;
    //var imageName = null;
    result
      .then(async (imgData) => {
        //Object.values(data).length
        // if length is 4 it means there is external data
        // for the meta data of the new image

        // if it is just 1 it means the image that is used is default
        // and there is no need to store any image
        //console.log(imgData);
        //var successImageChange = null;
        if (Object.values(imgData).length === 4) {
          // STORING THE IMAGE
          var string = requestArray2D[2][1];
          var regex = /^data:.+\/(.+);base64,(.*)$/;
          var matches = string.match(regex);
          var ext = matches[1];
          var data = matches[2];
          var buffer = Buffer.from(data, "base64");
          const role = ["Unspecified", "Admin", "Employee"];
          var imageName =
            `${
              role[await imgData.staffRoleId]
            }/${await imgData.staffFullName}-[${new Date()
              .toISOString()
              .substring(0, 10)}][${makeid(5)}].` + ext;
          //console.log(imageName);
          fs.writeFileSync(`./uploads/staffImages/${imageName}`, buffer);
          const result1 = db.updateStaffImg(imageName, staffId);
          //TODO: the result of the image being inserted hasn't been checked!
          //successImageChange = await result1;
        }
        if (Object.values(imgData).length > 0) {
          // console.log("HERE");
          //console.log(successImageChange && successImageChange.affectedRows);
          response.json({
            status: "success",
            //affectedRows: data.affectedRows,
            message: `Staff Information Updated successfuly!`,
          });
        }
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
          message: `There is a staff with the same \'${err.message}\'`,
        });
      });
  }
};
//updateLandOwnership
exports.updateLandOwnership = async (request, response) => {
  /*
  currentOwner: 1,
  newOwner: 8,
  issuedBy: 3,
  lastModifiedDate: '2022-12-31',
  cartaTitleDeedNo: '111111'
  newOwnerName: 'Gizaw Barnabas Gorfu'
  */
  const result = db.updateLandOwnership(request.body);
  result.then((data) => {
    // Getting the image name from the result
    //console.log(data[0].img.toString().split(".").pop());
    var imgExt = data[0].img.toString().split(".").pop();
    var imageName =
      `${request.body.newOwnerName}-[${request.body.lastModifiedDate}][${makeid(
        5
      )}].` + imgExt;
    if (data) {
      //Here the image is duplicated and renamed by the new owner name
      fs.copyFile(
        `./uploads/cartaImages/${data[0].img}`,
        `./uploads/cartaImages/${imageName}`,
        (err) => {
          if (err) throw err;
          if (!err) {
            const result1 = db.updateLandImage(
              imageName,
              request.body.cartaTitleDeedNo
            );
            result1.then((data) => {
              if (data) {
                if (data.affectedRows === 1) {
                  response.json({
                    status: "success",
                    //affectedRows: data.affectedRows,
                    message: `Owner Information Updated successfuly!`,
                  });
                }
              }
            });
          }
        }
      );
    }
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
