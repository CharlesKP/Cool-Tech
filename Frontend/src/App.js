/*
 * Cooltech databes. Please read the readme.docx
 * along with screenshots in the main folder (./CoolTech/readme.docx)
 * it will explain how the app works with screenshots
 */

import React from "react";
import { useState } from "react";
import Login from "./Components/Login";
import AddUser from "./Components/AddUser";
import logo from "./cooltech-logo.jpg";
import "./App.css";

function App() {
  //setting if display is for adding user or for logging in
  const [display, setDisplay] = useState([]);

  //setdisplay to different components
  //login
  const login = () => {
    setDisplay(<Login />);
  };

  //add user
  const addUser = () => {
    setDisplay(<AddUser />);
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* CoolTech logo image */}
        <img className="logo" src={logo} alt="logo"></img>
      </header>

      {/* button to display add user and login */}
      <div className="selection">
        <button id="addUser" className="greenButton" onClick={addUser}>
          Add User
        </button>
        <button id="login" className="greenButton" onClick={login}>
          Login
        </button>
      </div>
      {/* display below whether login or add user */}
      {display}
    </div>
  );
}

export default App;
