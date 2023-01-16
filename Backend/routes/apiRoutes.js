const express = require("express");
const app = express();
const cors = require("cors");
const router = express.Router();
//controllers imported
const controllers = require("../controllers/log.controller");

app.use(cors());

//route for the api call to get all the users from the database
router.route("/findAll").get((req, res) => {
  controllers.findAll(req, res);
});

//route for the api call to delete user
router.route("/delete").post((req, res) => {
  controllers.delete(req, res);
});

//route for the api call to update user
//for Admin status
router.route("/update").put((req, res) => {
  controllers.update(req, res);
});

//route for the api call to update username and password only
//for Management status
router.route("/updateCreds").put((req, res) => {
  controllers.updateCreds(req, res);
});

//route for the api call to update username and password only
//for Management status
router.route("/userPassword").put((req, res) => {
  controllers.updatePassword(req, res);
});

//router to create new user, using log controllers create function
router.route("/addUser").post((req, res) => {
  controllers.create(req, res);
});

//post username and password to http://localhost:8080/login
//returns token if in database
router.route("/loginToken").post((req, res) => {
  controllers.loginCheck(req, res);
});

//post username and password to http://localhost:8080/login
//returns token if in database
router.route("/decodeToken").post((req, res) => {
  controllers.decode(req, res);
});

module.exports = router;
