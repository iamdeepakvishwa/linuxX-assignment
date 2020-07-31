import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import 'bootswatch/dist/superhero/bootstrap.min.css'; 

export default function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };

  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <a class="navbar-brand" href="/">LinuxX Assignment</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse form-inline my-2 my-lg-0" id="navbarColor01">
      {userData.user ? (
        <button onClick={logout} class="btn btn-outline-warning form-inline my-2 my-lg-0">Log out</button>
      ) : (
        <>
          <button onClick={register} class="btn btn-outline-warning my-2 my-sm-0">Register</button>
          <button onClick={login} class= "btn btn-outline-warning my-2 my-sm-0">Log in</button>
        </>
      )}
      </div>
    </nav>
  );
}