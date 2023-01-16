const User = require("../models/modelSchema");
//import jwt webtoken
const jwt = require("jsonwebtoken");

exports.create = function (req, res) {
  // Create and save a new user
  const name = req.body.name;
  const ou = req.body.ou;
  const division = req.body.division;
  const role = req.body.role;
  const username = req.body.username;
  const password = req.body.password;
  //new user = to those data points
  const newUser = new User({
    name,
    ou,
    division,
    role,
    username,
    password,
  });
  //save new user
  newUser
    .save()
    .then(() => res.json("New User Added!"))
    .catch((error) => res.status(422).send("Error: " + error));
};

//---------------------FIND----------------------------------

//find all entries in the database
exports.findAll = function (req, res) {
  User.find(function (err, users) {
    if (err) {
      console.log(err);
      res.status(500).send("Some error occurred while retrieving" + err);
    } else {
      res.send(users);
    }
  });
};

//----------------------DELETE---------------------------------
exports.delete = function (req, res) {
  //delete specific user based on api id send
  User.deleteOne({ _id: req.body._id }, function (err, user) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "There was an error getting the credentials" });
    } else {
      res.send("DELETED: " + user);
    }
  });
};

//login, find user in database
exports.loginCheck = function (req, res) {
  //Find user credentions inside Schema
  User.find(
    { username: req.body.username, password: req.body.password },
    function (err, user) {
      let body = user[0];
      try {
        if (err) {
          console.log(err);
          //if not found login = false else login = true and send user info
          res.status(500).send({ token: false });
        } else {
          const token = jwt.sign(JSON.stringify(body), "jwt-secret", {
            algorithm: "HS256",
          });
          //if true send token
          res.send({ token: token });
          console.log("Token approved: " + token);
        }
      } catch (error) {
        //if error, taken = false
        console.error("No credentials");
        res.status(404).send({ token: false });
      }
    }
  );
};

//send back decoded information from the JWT token
exports.decode = function (req, res) {
  const auth = req.headers.authorization;
  const token = auth.split(" ")[1];
  //check if the token can be decoded and send username
  try {
    const decoded = jwt.verify(token, "jwt-secret");
    res.send({ user: decoded });
    console.log("YAY");
  } catch (err) {
    //for bad token
    res.send({ user: false });
    console.log(err);
  }
};
//----------------UPDATE-------------------------

//update all information
exports.update = function (req, res) {
  let id = { _id: req.body._id };
  //set new values to body request values
  let newvalues = {
    $set: {
      name: req.body.name,
      ou: req.body.ou,
      division: req.body.division,
      role: req.body.role,
      username: req.body.username,
      password: req.body.password,
    },
  };
  //find that user based on id and set to values above
  User.findOneAndUpdate(id, newvalues, function (err) {
    if (err) {
      console.log(
        "There was some sort of issue while trying to update the user"
      );
    }
    res.send("updating user was successful");
  });
};

//update username + password
exports.updateCreds = function (req, res) {
  console.log(req.body);
  //id is the id sent by request as well as user + pass
  let id = { _id: req.body._id };
  let newvalues = {
    $set: {
      username: req.body.username,
      password: req.body.password,
    },
  };
  User.findOneAndUpdate(id, newvalues, function (err) {
    if (err) {
      console.log(
        "There was some sort of issue while trying to update the user"
      );
    }
    res.send("updating user was successful");
  });
};

//update password of User only - this is for those with only User privileges
exports.updatePassword = function (req, res) {
  console.log(req.body);
  //id is the id sent by request as well as new password
  let id = { _id: req.body._id };
  let newvalues = {
    $set: {
      password: req.body.password,
    },
  };
  User.findOneAndUpdate(id, newvalues, function (err) {
    if (err) {
      console.log(
        "There was some sort of issue while trying to update the password"
      );
    }
    res.send("updating the password was successful");
  });
};
