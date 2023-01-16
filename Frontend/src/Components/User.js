import React from "react";

function User({ user, current }) {
  //the edit/save function
  const edit = (id) => {
    //getting values from the table rows of each user
    let password = document.getElementById(id + "pword").innerHTML;

    //when clicking on the save button, it injected a <br> in the
    //new field, so this removes any potential of that happening
    password = password.replace(/<br>/g, "");

    //body for api PUT
    let body = {
      _id: user._id,
      password: password,
    };

    console.log(body);

    //api call to update an item based on id
    fetch("http://localhost:8080/api/userPassword", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Edited" + data);
      });

    alert("Saved");
  };
  //User can only view users in the database and not their passwords
  if (current == user._id) {
    return (
      <>
        <tr className="editing" id={user._id}>
          <td id={user._id + "name"}>{user.name}</td>
          <td id={user._id + "ou"}>{user.ou}</td>
          <td id={user._id + "div"}>{user.division}</td>
          <td id={user.role + "role"}>{user.role}</td>
          <td id={user._id + "uname"}>{user.username}</td>
          {/* make the password editable */}
          <td className="user" contentEditable={true} id={user._id + "pword"}>
            {user.password}
          </td>
          {/* button to save edited row */}
          <td>
            <button
              contentEditable={false}
              onClick={() => {
                edit(user._id);
              }}
            >
              Save
            </button>
          </td>
        </tr>
      </>
    );
    //else if not the current user, the password only contains *******
    //and user is unable to edit other people's passwords
  } else {
    return (
      <>
        <tr className="editing" id={user._id}>
          <td id={user._id + "name"}>{user.name}</td>
          <td id={user._id + "ou"}>{user.ou}</td>
          <td id={user._id + "div"}>{user.division}</td>
          <td id={user._id + "role"}>{user.role}</td>
          <td id={user._id + "uname"}>{user.username}</td>
          <td id={user._id + "pword"}>*******</td>
          <td id={user._id + "save"}></td>
        </tr>
      </>
    );
  }
}

export default User;
