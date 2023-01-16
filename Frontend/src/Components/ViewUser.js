import React from "react";
import { useState, useEffect } from "react";
import User from "./User";
import Admin from "./Admin";
import Management from "./Management";
import "../App.css";

function ViewUser({ user }) {
  let list = [];
  const [display, setDisplay] = useState([]);

  //useEffect for api get request to display all from database
  useEffect(() => {
    fetch("http://localhost:8080/api/findAll")
      .then((res) => res.json())
      .then((data) => {
        //sort function to display
        //users but role alphabetically (Admin -> Managment -> User)
        data.sort(function (a, b) {
          let first = a.role;
          let second = b.role;
          return first < second ? -1 : first > second ? 1 : 0;
        });
        setDisplay(data);
      });
  });

  //maps each item in the database based on the role of the current user logged in
  display.map((e) => {
    //if it exists and archived is false, then display
    if (user.role == "User") {
      //sending current user id for that user to be able to change their password
      list.push(<User user={e} current={user._id} />);
    } else if (user.role == "Management") {
      list.push(<Management user={e} />);
    } else if (user.role == "Admin") {
      list.push(<Admin user={e} />);
    }
  });

  //if no user then display
  if (!user) {
    return (
      <div className="App">
        <table className="jobs">
          <tr>
            <th className="headerDescription">Name</th>
            <th className="headerLocation">Organisation</th>
            <th className="headerStatus">Division</th>
            <th className="headerStatus">Role</th>
            <th className="headerStatus">Username</th>
            <th className="headerStatus">Password</th>
          </tr>
          {list}
        </table>
      </div>
    );
    //else display the message above about priviliges
  } else if (user.role == "User") {
    return (
      <div className="App">
        <p className="greeting">
          Hello, <b>{user.name}!</b>
        </p>
        <p className="greeting">
          You have <b>{user.role}</b> privileges. <br></br>(edit your password)
        </p>
        <table className="jobs">
          <tr>
            <th className="headerDescription">Name</th>
            <th className="headerLocation">Organisation</th>
            <th className="headerStatus">Division</th>
            <th className="headerStatus">Role</th>
            <th className="headerStatus">Username</th>
            <th className="headerStatus">Password</th>
            <th className="headerStatus"></th>
          </tr>
          {/* displaying list of users */}
          {list}
        </table>
      </div>
    );
    //if role is management, display different message and table
  } else if (user.role == "Management") {
    return (
      <div className="App">
        <p className="greeting">
          Hello, <b>{user.name}!</b>
        </p>
        <p className="greeting">
          You have <b>{user.role}</b> privileges<br></br>(edit creds, create &
          remove)
        </p>
        <table className="jobs">
          <tr>
            <th className="headerDescription">Name</th>
            <th className="headerLocation">Organisation</th>
            <th className="headerStatus">Division</th>
            <th className="headerStatus">Role</th>
            <th className="headerStatus">Username</th>
            <th className="headerStatus">Password</th>
            <th className="headerStatus"></th>
            <th className="headerStatus"></th>
          </tr>
          {/* displaying list of users */}
          {list}
        </table>
      </div>
    );
    //if role is admin, display different message and table
  } else if (user.role == "Admin") {
    return (
      <div className="App">
        <p className="greeting">
          Hello, <b>{user.name}!</b>
        </p>
        <p className="greeting">
          You have <b>{user.role}</b> privileges <br></br>
          (edit, create & remove)
        </p>
        <table className="jobs">
          <tr>
            <th className="headerDescription">Name</th>
            <th className="headerLocation">Organisation</th>
            <th className="headerStatus">Division</th>
            <th className="headerStatus">Role</th>
            <th className="headerStatus">Username</th>
            <th className="headerStatus">Password</th>
            <th className="headerStatus"></th>
            <th className="headerStatus"></th>
          </tr>
          {/* displaying list of users */}
          {list}
        </table>
      </div>
    );
  }
}

export default ViewUser;
