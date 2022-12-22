require("dotenv").config();

// Database connection
// const db = require("./config/databaseConfig");
//
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(express.json({ limit: "1mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "1mb" }));

const cors = require("cors");
app.use(
  cors({
    origin: [process.env.REACT_SERVER],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use("/uploads", express.static("./uploads"));
//Addis Ababa Landholding Registration & Information Agency
app.use("/AALHRIA", require("./routes/routeConfig"));

// Cryptography
// const bcrypt = require("bcrypt");
// const saltRounds = 10;

// JWT TOKEN
// const jwt = require("jsonwebtoken");

/*
const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send("Token is required!");
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "Authentication Failure!" });
      } else {
        req.userId = decoded.id;
        req.username = decoded.username;
        next();
      }
    });
  }
};
*/

/*
const resolveRole = (roleId) => {
  const response = new Promise((resolve, reject) => {
    const query = "SELECT * FROM role WHERE id = ?;";
    db.query(query, [roleId], (err, result) => {
      if (err) reject(new Error(err.message));
      resolve(result[0].rolename);
    });
  });
  return response;
  };
*/
/*
  return new Promise((resolve, reject) => {
    resolve(db.query("SELECT * FROM role WHERE id = ?;", roleId));
  });
 
  db.query("SELECT * FROM role WHERE id = ?;", roleId, (err, result) => {
    // console.log(`Role name: ${result[0].rolename}`);
    return result[0].rolename;
  });
  */
/*
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  var roleName = "";
  db.query(
    "SELECT * FROM staff WHERE username = ?;",
    username,
    (err, result) => {
      if (err === nulld) {
        if (result.length > 0) {
          console.log(`User [${username}] found`);
          bcrypt.compare(
            password,
            result[0].password,
            async (error, response) => {
              if (response) {
                console.log(`User's password hash [${password}] match!`);
                const id = result[0].id;
                const username = result[0].username;
                //result[0].roleid
                
                // resolveRole(result[0].roleid).then(() => {
                // console.log(`hello: ${result[0].rolename}`);
               //  });
                
                console.log(`login result : ${roleName}`);
                console.log("-----------------");
                console.log(`Value in token ${id}`);
                const token = jwt.sign(
                  { id, username },
                  process.env.JWT_SECRET,
                  {
                    expiresIn: 86400, // 1 day [value in seconds ]
                  }
                );
                res.json({ auth: true, token: token, result: result });
              } else {
                res.json({
                  auth: false,
                  message: "Wrong username/password combination!",
                });
              }
            }
          );
        } else {
          console.log(`User [${username}] not found`);
          res.json({ auth: false, message: "No user exists!" });
        }
      } else {
        console.log(err);
        res.send({ err: err });
        throw err;
      }
    }
  );
});

app.get("/isloggedin", verifyJWT, (req, res) => {
  console.log(`User Auth : ${req.userId}`);
  console.log(`User name : ${req.username}`);
  res.json({
    loggedIn: true,
    userId: req.userId,
    username: req.username,
    message: "You are authenticated!",
  });
});
*/
app.listen(process.env.PORT, () => {
  console.log(`Node Running Server on port :${process.env.PORT}`);
});
