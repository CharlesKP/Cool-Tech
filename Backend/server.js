const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8080;

//use express json
app.use(express.json());
app.use(cors());
//connect to specified database
const uri =
  "mongodb+srv://moo:moo@cluster0.gvfay.mongodb.net/cooltech?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;
mongoose.connect(uri);

//display when connectiong is made to mongo database
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB conneciton made!");
});

//import and use router
const apiRouter = require("./routes/apiRoutes");
app.use("/api", apiRouter);

//app listening on port 8080, declared at the top
app.listen(port, () => console.log("Listening engaged on port: " + port));
