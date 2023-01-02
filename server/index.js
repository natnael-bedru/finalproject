require("dotenv").config();

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
// The path for the font end to retrive the images from.
app.use("/uploads", express.static("./uploads"));
//Addis Ababa Landholding Registration & Information Agency
app.use("/AALHRIA", require("./routes/routeConfig"));
// Node Server Starting Here
app.listen(process.env.NODE_SERVER_PORT, () => {
  console.log(`Node Running Server on port : ${process.env.NODE_SERVER_PORT}`);
});
