const dbConn = require("../config/databaseConfig");

class DbService {
  async login(username) {
    return new Promise((resolve, reject) => {
      // This just checks wheter the username exists in the database and
      // send the select statement result to the controllerConfig for password checking
      const query = "SELECT * FROM staff WHERE username = ?;";
      dbConn.query(query, username, (err, result) => {
        if (result.length > 0) {
          resolve(result);
        } else {
          reject(new Error("The account does not exist!"));
        }
      });
    });
  }

  async retriveRole(roleId) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM role WHERE id = ?;";
      dbConn.query(query, roleId, (err, result) => {
        if (result.length > 0) {
          resolve(result);
        } else {
          reject(new Error("Unable to retrive database information!"));
        }
      });
    });
  }
  //db.retriveAdminName(data[0].assignedBy);
  async retriveAdminName(adminId) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM staff WHERE id = ?;";
      dbConn.query(query, adminId, (err, result) => {
        if (result === undefined) {
          var res = '{ "status":"NULL" }';
          const obj = JSON.parse(res);
          resolve(obj);
        } else if (result.length > 0) {
          resolve(result);
        } else {
          reject(new Error("Unable to retrive database information!"));
        }
      });
    });
  }

  async registerStaff(data) {
    //  console.log(`Data :${Object.values(data)}`);
    return new Promise((resolve, reject) => {
      // This adds staff members into the database
      const query = `INSERT INTO staff VALUES (0,?);`;
      dbConn.query(query, [Object.values(data)], (err, result) => {
        if (err) {
          // ER_DUP_ENTRY only handled ..
          // The following code manipulates the error code for the front end
          // console.log(`DB ERROR: ${err}`);
          var errMessage = err.sqlMessage
            .replace(new RegExp(".*" + "key"), "")
            .slice(2, -1)
            .replace(new RegExp(".*" + "staff."), "")
            .replace("_UNIQUE", "")
            .replace(".", " and ");
          reject({ code: err.code, message: errMessage });
        }
        resolve(result);
      });
    });
  }

  async viewAllStaff(assignedBy, id) {
    //console.log(`Assigned by: ${assignedBy} \n Id: ${id}`);
    return new Promise((resolve, reject) => {
      if (assignedBy) {
        // console.log("HERE1");
        const query = `SELECT * FROM staff WHERE assignedBy = ? ;`;
        dbConn.query(query, id, (err, result) => {
          if (err) reject(new Error("Unable to retrive database information!"));
          if (result.length > 0) {
            resolve(result);
          }
        });
      } else {
        console.log("HERE2");
        // if the current id is null which is the original main Admin
        const query = `SELECT * FROM staff ;`;
        dbConn.query(query, (err, result) => {
          if (err) reject(new Error("Unable to retrive database information!"));
          if (result.length > 0) {
            resolve(result);
          }
        });
      }
    });
  }
  async viewStaff(id) {
    return new Promise((resolve, reject) => {
      // This adds staff members into the database
      const query = `SELECT roleid, img, assignedBy, firstName, middleName, lastName, username, accountStatus, email, phoneNumber, sex, birthday, residentAddress, lastChanged, joinedDate FROM staff WHERE id = ?;`;
      dbConn.query(query, id, (err, result) => {
        if (err) reject(new Error("Unable to retrive database information!"));
        if (result.length > 0) {
          // console.log("Here");
          // console.log(result);
          resolve(result);
        }
      });
    });
  }

  //viewAllOwner
  async viewAllOwner() {
    //console.log(`Assigned by: ${assignedBy} \n Id: ${id}`);
    return new Promise((resolve, reject) => {
      // if (assignedBy) {
      //   // console.log("HERE1");
      //   const query = `SELECT * FROM staff WHERE assignedBy = ? ;`;
      //   dbConn.query(query, id, (err, result) => {
      //     if (err) reject(new Error("Unable to retrive database information!"));
      //     if (result.length > 0) {
      //       resolve(result);
      //     }
      //   });
      // } else {
      //console.log("HERE2");
      // if the current id is null which is the original main Admin
      const query = `SELECT * FROM citizen ;`;
      dbConn.query(query, (err, result) => {
        if (err) reject(new Error("Unable to retrive database information!"));
        if (result.length > 0) {
          resolve(result);
        }
      });
      //}
    });
  }
  //
  //retriveWoredaInfo
  async retriveWoredaInfo(id) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM woreda WHERE id = ? ;`;
      dbConn.query(query, id, (err, result) => {
        if (err) reject(new Error("Unable to retrive database information!"));
        if (result.length > 0) {
          resolve(result);
        }
      });
    }).then((result) => {
      return new Promise((resolve, reject) => {
        const query = `SELECT * FROM subcity WHERE id = ? ;`;
        dbConn.query(query, result[0].subCityId, (err, result) => {
          if (err) reject(new Error("Unable to retrive database information!"));
          if (result.length > 0) {
            //console.log(result[0].subCityName);
            resolve(result);
          }
        });
      }).then((data) => {
        // RESULT: [ { id: 1, subCityId: 10, woredaNumber: 12, kebeleNumber: 9 } ]
        // DATA: [ { id: 10, subCityName: 'Yeka' } ]
        const out = {
          woredaNumber: result[0].woredaNumber,
          kebeleNumber: result[0].kebeleNumber,
          subCityName: data[0].subCityName,
        };
        // { woredaNumber: 11, kebeleNumber: 5, subCityName: 'Yeka' }
        return out;
      });
    });
  }
  //viewOwner
  //TODO: FIX NAME TO CITIZEN
  async viewOwner(id) {
    return new Promise((resolve, reject) => {
      //This retrives Citizen information by using the id
      const query = `SELECT * FROM citizen WHERE id = ?;`;
      dbConn.query(query, id, (err, result) => {
        //console.log(result);
        if (err) reject(new Error("Unable to retrive database information!"));
        if (result.length > 0) {
          //console.log(result[0].woredaId);
          resolve(result);
          // OUTPUTS
          /*
            id: 1,
            img: 'Male/1.jpg',
            firstName: 'Hailu',
            middleName: 'Tesfai',
            lastName: 'Nataye',
            sex: 'Male',
            phonenumber: '0911223344',
            dateofbirth: 1987-10-30T21:00:00.000Z,
            woredaId: 1
          */
        }
      });
    });
  }

  async retriveAllWoredaInfo() {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM woreda ;`;
      dbConn.query(query, (err, result) => {
        if (err) reject(new Error("Unable to retrive database information!"));
        if (result.length > 0) {
          resolve(result);
        }
      });
    }).then((result) => {
      return new Promise((resolve, reject) => {
        const query = `SELECT * FROM subcity WHERE id = ? ;`;
        dbConn.query(query, result[0].subCityId, (err, result) => {
          if (err) reject(new Error("Unable to retrive database information!"));
          if (result.length > 0) {
            //console.log(result[0].subCityName);
            resolve(result);
          }
        });
      }).then((data) => {
        // RESULT: [ { id: 1, subCityId: 10, woredaNumber: 12, kebeleNumber: 9 } ]
        // DATA: [ { id: 10, subCityName: 'Yeka' } ]
        var jsonObj = [];
        for (let x in result) {
          const out = {
            woredaNumber: result[x].woredaNumber,
            kebeleNumber: result[x].kebeleNumber,
            subCityName: data[0].subCityName,
          };
          jsonObj.push(out);
        }

        //console.log(jsonObj);
        return jsonObj;
      });
    });
  }
  //registerCoordinate
  async registerCoordinate(coodrinateData) {
    //const data = Object.values(coodrinateData);
    //console.log(`Data :${Object.values(coodrinateData)}`);
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO coordinateland VALUES (0,?);`;
      //console.log(query);
      dbConn.query(query, [Object.values(coodrinateData)], (err, result) => {
        if (err) reject({ code: err.code, message: err.sqlMessage });
        resolve(result);
      });
    });
  }
  //getCoordinate
  async getCoordinate(coodrinateid) {
    //console.log(`Coordinate Id ${coodrinateid}`);
    //const data = Object.values(coodrinateData);
    //console.log(`Data :${Object.values(coodrinateData)}`);
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM coordinateland WHERE id = ? ;`;
      //console.log(query);
      dbConn.query(query, coodrinateid, (err, result) => {
        if (err) reject({ code: err.code, message: err.sqlMessage });
        //console.log(result);
        resolve(result);
      });
    });
  }
  //getWoredaKebeleId
  async getWoredaKebeleId(currentWoreda, formerKebele) {
    // console.log(`Woreda ${currentWoreda}`);
    // console.log(`Kebele ${formerKebele}`);
    return new Promise((resolve, reject) => {
      const query = `SELECT id FROM woreda WHERE woredaNumber = ${currentWoreda} && kebeleNumber = ${formerKebele};`;
      dbConn.query(query, (err, result) => {
        if (err) reject(new Error("Unable to retrive database information!"));
        if (result.length > 0) {
          // returns the id for that particular pair of woredaNumber and kebeleNumber
          resolve(result[0].id);
        }
      });
    });
  }
  //registerLand
  async registerLand(carta) {
    //console.log(`Data :${Object.values(carta)}`);
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO carta  VALUES (0,?);`;
      dbConn.query(query, [Object.values(carta)], (err, result) => {
        if (err) {
          /*
          Handling error caused by context value of the staffId becoming 0
          ERROR:
          Cannot add or update a child row: 
          a foreign key constraint fails (`login_system`.`carta`, 
          CONSTRAINT `staffId_fk` FOREIGN KEY (`staffId`) 
          REFERENCES `staff` (`id`))
           // parsing for "staffId_fk"
          */
          var errMessage = err.sqlMessage;
          errMessage = errMessage.slice(102, -52);
          //console.log(errMessage.slice(102, -52));
          //console.log(err.sqlMessage);
          if (errMessage === "staffId_fk") {
            errMessage = "Please Relogin or Refresh your page!";
          }
          reject({ code: err.code, message: errMessage });
        }
        resolve(result);
      });
    });
  }
  //checkExistingLand
  async checkExistingLand(checkParameter) {
    // console.log(checkParameter);
    // console.log(`Woreda ${currentWoreda}`);
    // console.log(`Kebele ${formerKebele}`);
    return new Promise((resolve, reject) => {
      const query = `SELECT id FROM carta WHERE 
      citizenId = ${checkParameter.citizenId} && 
      woredaId = ${checkParameter.woredaId} && 
      blockNumber = ${checkParameter.blockNumber} && 
      parcelNumber = ${checkParameter.parcelNumber} && 
      houseNumber = ${checkParameter.houseNumber} && 
      plotArea = ${checkParameter.plotArea} && 
      builtUpArea = ${checkParameter.builtUpArea} && 
      basemapNo = ${checkParameter.basemapNo};`;
      dbConn.query(query, (err, result) => {
        if (err) reject(new Error("Unable to retrive database information!"));
        //if (result.length > 0) {
        //console.log("here");
        //console.log(result);
        // returns the id for that particular pair of woredaNumber and kebeleNumber
        resolve(result);
        //  }
      });
    });
  }
  // viewCarta
  async viewCarta(citizenId) {
    return new Promise((resolve, reject) => {
      // This adds staff members into the database
      const query = `SELECT * FROM carta WHERE citizenId = ?;`;
      dbConn.query(query, citizenId, (err, result) => {
        if (err) reject(new Error("Unable to retrive database information!"));
        //if (result.length > 0) {
        resolve(result);
        // }
      });
    });
  }
  //updateStaff
  async updateStaff(upStaff, staffId) {
    //  console.log(upStaff);
    var imageSet = false;
    if (upStaff[1][0] === "img" && upStaff[1][1] === "removed") {
      upStaff[1][1] = "Unspecified/defaultPicture.png";
      imageSet = true;
    }
    if (upStaff[1][0] !== "img") {
      // this condition handles when there is no image passed
      // through the upStaff therefore there is no image to be updated
      imageSet = true;
    }
    var upQuery = "";
    var header = null;
    var value = null;
    for (let row in upStaff) {
      for (let col in upStaff[0]) {
        if (parseInt(col) === 0) {
          header = upStaff[parseInt(row)][parseInt(col)];
          if (header === "img" && !imageSet) break;
        } else if (parseInt(col) === 1) {
          value = upStaff[parseInt(row)][parseInt(col)];
          upQuery += `${header}=\'${value}\',`;
        }
      }
    }
    return new Promise((resolve, reject) => {
      const query = `UPDATE staff SET ${upQuery.slice(
        0,
        -1
      )} WHERE (id = ${staffId})`;
      //console.log(query);

      dbConn.query(query, async (err, result) => {
        if (err) {
          // ER_DUP_ENTRY only handled ..
          // The following code manipulates the error code for the front end
          // console.log(`DB ERROR: ${err}`);
          var errMessage = err.sqlMessage
            .replace(new RegExp(".*" + "key"), "")
            .slice(2, -1)
            .replace(new RegExp(".*" + "staff."), "")
            .replace("_UNIQUE", "")
            .replace(".", " and ");
          reject({ code: err.code, message: errMessage });
        }
        if (result) {
          if (result.affectedRows === 1) {
            var resultOut = {
              affectedRows: result.affectedRows,
            };
            if (!imageSet) {
              //  console.log("HERE!");
              const result1 = this.viewStaff(staffId);
              const staffInfo = await result1;
              resultOut = {
                affectedRows: result.affectedRows,
                staffFullName: `${staffInfo[0].firstName} ${staffInfo[0].middleName} ${staffInfo[0].lastName}`,
                staffRoleId: staffInfo[0].roleid,
                staffImg: staffInfo[0].img,
              };
            }
            resolve(resultOut);
          }
        }
      });
    });

    // if (err) reject(new Error("Unable to retrive database information!"));
    //if (result.length > 0) {
    // resolve(result);
    // }

    //console.log(query);
    //UPDATE `login_system`.`staff` SET `roleid` = '5' WHERE (`id` = '2');
  }
  async updateStaffImg(imgPath, staffId) {
    //console.log(`${imgPath}`);
    // console.log(staffId);
    return new Promise((resolve, reject) => {
      // This updates the image with the appropriate image path name
      const query = `UPDATE staff SET img = \'${imgPath}\' WHERE (id = ${staffId} ) ;`;
      dbConn.query(query, (err, result) => {
        console.log(err);
        if (err) reject(new Error("Unable to retrive database information!"));
        //if (result.length > 0) {
        // console.log(result);
        resolve(result);
        // }
      });
    });
  }

  async updateLandOwnership(updateData) {
    /*
    currentOwner: 1,
    newOwner: 8,
    issuedBy: 3,
    lastModifiedDate: '2022-12-31',
    cartaTitleDeedNo: '111111'
    */
    //console.log(updateData);
    return new Promise((resolve, reject) => {
      //SET SQL_SAFE_UPDATES = 0;
      const query = `UPDATE carta SET 
      citizenId=\'${updateData.newOwner}\',
      lastModifiedBy=\'${updateData.issuedBy}\',
      lastModifiedDate=\'${updateData.lastModifiedDate}\'  
      WHERE (titleDeedNo = \'${updateData.cartaTitleDeedNo}\' ) ;`;

      dbConn.query(query, (err, result) => {
        // console.log(err);
        if (err) reject(new Error("Unable to retrive database information!"));
        //if (result.length > 0) {
        // console.log(result);
        resolve(result);
        // }
      });
    }).then((result1) => {
      //If the update was successful without the image part
      if (result1.affectedRows === 1) {
        return new Promise((resolve, reject) => {
          const query = `SELECT img FROM carta WHERE (titleDeedNo = \'${updateData.cartaTitleDeedNo}\' );`;
          dbConn.query(query, (err, result) => {
            // console.log(err);
            if (err)
              reject(new Error("Unable to retrive database information!"));
            //[ { img: 'Hailu Tesfai Nataye-[2022-12-31][B7sY9].jpeg' } ]
            resolve(result);
          });
        });
      }
      //return result1;
    });
  }

  async updateLandImage(updateImage, cartaTitleDeedNo) {
    //console.log(updateImage);
    return new Promise((resolve, reject) => {
      const query = `UPDATE carta SET img=\'${updateImage}\' WHERE (titleDeedNo = \'${cartaTitleDeedNo}\' ) ;`;
      dbConn.query(query, (err, result) => {
        console.log(err);
        if (err) reject(new Error("Unable to retrive database information!"));

        resolve(result);
      });
    });
  }
}

module.exports = DbService;
