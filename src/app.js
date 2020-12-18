const express = require("express");
const app = express();
const con = require("./db/db_connection");
const validator = require("validator");
app.use(express.json());

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
