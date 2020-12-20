const express = require("express");
const app = express();
const con = require("./db/db_connection");
const validator = require("validator");

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE");
    return res.status(200).json({});
  }
});

const Port = process.env.Port || 3000;

app.post("/user/register", (req, res) => {
  if (validator.isEmail(req.body.email) === false) {
    res.send("invalid E-mail");
  } else if (req.body.password.length < 7) {
    res.send("Password is too short");
  } else {
    var sql =
      "INSERT INTO users (`id`,`email`,`password`,`name`) VALUES (NULL,'" +
      req.body.email +
      "','" +
      req.body.password +
      "','" +
      req.body.name +
      "')";
    con.query(sql, (err, rows) => {
      if (!err) {
        res.send("Account created sucessfully");
      } else {
        res.send(err);
      }
    });
  }
});

app.listen(Port, () => {
  console.log(`hello from ${Port}`);
});
