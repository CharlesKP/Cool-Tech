//Import mongoose
const mongoose = require("mongoose");

// Schema model and specifications
const SchemaModel = mongoose.Schema;
const EmployeeSchema = new SchemaModel({
  name: {
    //name
    type: String,
    required: true,
  },
  ou: {
    //organizational unit
    type: String,
    required: true,
  },
  //division
  division: {
    type: String,
    required: true,
  },
  role: {
    //default signup is User
    type: String,
    default: "User",
    required: true,
  },
  //username
  username: {
    type: String,
    required: true,
  },
  //password
  password: {
    type: String,
    required: true,
  },
});

// Model
const Schema = mongoose.model("users", EmployeeSchema);
//export schema
module.exports = Schema;
