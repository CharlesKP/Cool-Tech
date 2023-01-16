import React from "react";
import ViewUser from "./ViewUser";
import { useState } from "react";

//login component
function Login() {
  //states
  const [loginStatus, setLoginStatus] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [warning, setWarning] = useState("");

  //function to check login
  const checkLogin = (e) => {
    //prevent default
    //get user and password from input fields
    e.preventDefault();
    let user = document.getElementById("usernameLogin").value;
    let pass = document.getElementById("passwordLogin").value;

    //body to be sent via api
    let body = {
      username: user,
      password: pass,
    };

    console.log(body);
    fetch(
      "http://localhost:8080/api/loginToken",

      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(body),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // call function to check token
        getInfo(data);
      });

    //function to check the token received
    const getInfo = (token) => {
      console.log(token);
      fetch(
        "http://localhost:8080/api/decodeToken",

        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            //sending auth token
            Authorization: "Bearer " + token.token,
          },
          method: "POST",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          //if no user is passed in the api resonse
          if (data.user === false) {
            setLoginStatus(false);
            //set state for warning message
            setWarning("Invalid Login");
            //clear input fields
            document.getElementById("usernameLogin").value = "";
            document.getElementById("passwordLogin").value = "";
            //else login was accepted
          } else {
            setLoginStatus(true);
            setCurrentUser(data.user);
          }
        });
    };
  };

  //if login is false
  if (!loginStatus) {
    return (
      <form className="loginForm">
        <input id="usernameLogin" placeholder="username"></input>
        <input id="passwordLogin" placeholder="password"></input>
        <button className="greenButton" onClick={checkLogin}>
          Enter
        </button>
        {/* space for invalid login warning */}
        <h4 className="notice">{warning}</h4>
      </form>
    );
    //else if login was true
    //display user list component
  } else if (loginStatus) {
    return <ViewUser user={currentUser} />;
    //else error message
  } else {
    return "Whoops! something went wrong!";
  }
}

export default Login;
