import React from "react";

//job deconstructed
function User({ user }) {
  //function to archive
  const remove = () => {
    //if archived then will not be passed into JOb component
    let body = { _id: user._id };

    //api call sending body
    fetch(
      "http://localhost:8080/api/delete",

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
        console.log("deleted" + data);
      });
  };

  //the edit/save function
  const edit = (id) => {
    let username = document.getElementById(id + "uname").innerHTML;
    let password = document.getElementById(id + "pword").innerHTML;

    //when clicking on the save button, it injected a <br> in the
    //new field, so this removes any potential of that happening
    username = username.replace(/<br>/g, "");
    password = password.replace(/<br>/g, "");

    //body for api PUT
    let body = {
      _id: user._id,
      username: username,
      password: password,
    };

    console.log(body);

    //api call to update an item based on id
    fetch("http://localhost:8080/api/updateCreds", {
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

  //renders the <td> for each job
  //the content is editable and highlighted red (css className:focus)
  //then the new value is sent to edit() onClick save button
  //supress warning error for content editable
  return (
    <>
      <tr
        className="editing"
        id={user._id}
        suppressContentEditableWarning={true}
      >
        <td id={user._id + "name"}>{user.name}</td>
        <td id={user._id + "ou"}>{user.ou}</td>
        <td id={user._id + "div"}>{user.division}</td>
        <td id={user._id + "role"}>{user.role}</td>
        <td contentEditable={true} className="manage" id={user._id + "uname"}>
          {user.username}
        </td>
        <td contentEditable={true} className="manage" id={user._id + "pword"}>
          {user.password}
        </td>
        <td>
          {/* button to save edited row */}
          <button
            onClick={() => {
              edit(user._id);
            }}
          >
            Save
          </button>
        </td>
        <td>
          {/* button to archive */}
          <button
            onClick={() => {
              remove(user._id);
            }}
          >
            X
          </button>
        </td>
      </tr>
    </>
  );
}

export default User;
