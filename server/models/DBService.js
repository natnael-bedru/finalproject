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
    console.log(`Data :${Object.values(data)}`);
    return new Promise((resolve, reject) => {
      // This adds staff members into the database
      const query = `INSERT INTO staff VALUES (0,?);`;
      dbConn.query(query, [Object.values(data)], (err, result) => {
        if (err) {
          // ER_DUP_ENTRY only handled ..
          // The following code manipulates the error code for the front end
          console.log(`DB ERROR: ${err}`);
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
      const query = `SELECT roleid, img, assignedBy, firstName, middleName, lastName, username, accountStatus, email, phoneNumber, sex, birthday, residentAddress, joinedDate FROM staff WHERE id = ?;`;
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
  /*
  async getAllData() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM names";
        dbConn.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      console.log("[getAllData]");
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async insertNewName(name) {
    try {
      const dateAdded = new Date();
      const insertId = await new Promise((resolve, reject) => {
        const query = "INSERT INTO names (name,date_added) VALUES (?, ?);";
        dbConn.query(query, [name, dateAdded], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result.insertId);
        });
      });
      //console.log(response);
      //return response;
      // console.log(insertId);
      return {
        id: insertId,
        name: name,
        dateAdded: dateAdded,
      };
    } catch (err) {
      console.log(err);
    }
  }
  async deleteRowById(id) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = "DELETE FROM names WHERE id = ?";
        dbConn.query(query, [id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result.affectedRows);
        });
      });
      // console.log(response);
      return response === 1 ? true : false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async updateNameById(id, name) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = "UPDATE names SET name = ? WHERE id = ?";
        dbConn.query(query, [name, id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result.affectedRows);
        });
      });
      //console.log(response);
      return response === 1 ? true : false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async searchByName(name) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM names WHERE name = ?";
        dbConn.query(query, [name], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
  */
}

module.exports = DbService;
