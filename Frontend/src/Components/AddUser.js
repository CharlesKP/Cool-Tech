import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ViewUser from "./ViewUser";

//AddUser component
function AddUser() {
  const [addedUser, setAddedUser] = useState(false);
  const [newUser, setNewUser] = useState();
  const [users, setUsers] = useState([]);
  let usernameArray = [];

  //useEffect for api get request to display all from database
  useEffect(() => {
    fetch("http://localhost:8080/api/findAll")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  });

  //function to add User
  const add = (e) => {
    //prevent default submit and get field values from input
    e.preventDefault();
    let name = document.getElementById("name").value;
    let organisation = document.getElementById("organisation").value;
    let division = document.getElementById("division").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    //creating a username array to compare to current user's choice of username
    for (let i = 0; i < users.length; i++) {
      usernameArray.push(users[i].username);
    }

    //body for api call
    let body = {
      name: name,
      ou: organisation,
      division: division,
      role: "User",
      username: username,
      password: password,
    };

    //validation for the form not being inputted correctly
    //and the username has not already been taken
    if (name == "" || username == "" || password == "") {
      alert("Please make sure you have all the fields in the form filled in");
    } else if (usernameArray.includes(username)) {
      alert(
        username + ": has already been taken, please try another username!"
      );
      //else go ahead with the api call
    } else {
      //api call to post data/body
      fetch("http://localhost:8080/api/addUser", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("all marked complete" + data);
          setNewUser(body);
          setAddedUser(true);
        });

      //return field data to empty
      document.getElementById("name").value = "";
      document.getElementById("organisation").value = "";
      document.getElementById("division").value = "";
      document.getElementById("username").value = "";
      document.getElementById("password").value = "";
    }
  };

  //conditional rendering
  if (!addedUser) {
    //html render for the inputs and submit buttons
    return (
      <div className="add">
        <h3>Sign Up</h3>
        <form className="job-form">
          <input id="name" type="text" placeholder="Name" required></input>
          <br></br>
          <br></br>
          {/* ou selection */}
          <select id="organisation" defaultValue="News management">
            <option value="News management">News management</option>
            <option value="Software reviews">Software reviews</option>
            <option value="Hardware reviews">Hardware reviews</option>
            <option value="Opinion publishing">Opinion publishing</option>
          </select>
          <br></br>
          <br></br>
          {/* division selection */}
          <select id="division">
            <option value="Content" defaultValue>
              Content
            </option>
            <option value="Writing">Writing</option>
            <option value="Development">Development</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
            <option value="Software">Software</option>
            <option value="Legal">Legal</option>
          </select>
          <br></br>
          <br></br>
          <input
            id="username"
            type="text"
            placeholder="Username"
            required
          ></input>
          <br></br>
          <br></br>
          <input
            type="password"
            id="password"
            type="text"
            placeholder="Password"
            required
          ></input>
          <br></br>
          <br></br>
          {/* add user, onclick function */}
          <button className="greenButton wideButton" onClick={add}>
            Add
          </button>
        </form>
      </div>
    );
    //if added user is true, then display successful message
  } else if (addedUser) {
    return (
      <h4 className="notice">
        Success! <b>{newUser.name}</b> hass been added to the database. Please
        proceed to login, or add another user!
      </h4>
    );
    //else there was an error
  } else {
    return <h4 className="notice">Whoops! Something went wrong!</h4>;
  }
}

export default AddUser;
