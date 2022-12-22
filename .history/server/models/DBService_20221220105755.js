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
          resolve(result);
        }
      });
    });
  }

  //viewAllOwner
  async viewAllOwner(assignedBy, id) {
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

  //retriveWoredaInfo

  async retriveWoredaInfo(id) {
    new Promise((resolve, reject) => {
      const query = `SELECT * FROM woreda WHERE id = ? ;`;
      dbConn.query(query, id, (err, result) => {
        if (err) reject(new Error("Unable to retrive database information!"));
        if (result.length > 0) {
          resolve(result);
        }
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
