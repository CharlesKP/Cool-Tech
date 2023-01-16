const jwt = require("jsonwebtoken");

exports.login = (data) => {
  if (data.token) {
    const auth = JSON.parse(data.token);
    const token = auth.split(" ")[1];
    //check if the token can be decoded and send username
    try {
      const decoded = jwt.verify(token, "jwt-secret");
      return { login: true, user: decoded };
    } catch (err) {
      //for bad token
      return { login: false };
    }
  } else {
    return { login: false };
  }
};
