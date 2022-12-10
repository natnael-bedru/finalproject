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
