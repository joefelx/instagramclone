import "./register.css";
import axios from "axios";
import { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {CircularProgress} from "@material-ui/core"

function Register() {
  const email = useRef();
  const fullname = useRef();
  const username = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();
  const {isFetching} = useContext(AuthContext)


  const handleClick = async (e) => {
    e.preventDefault();
    if (password.current.value !== passwordAgain.current.value) {
      passwordAgain.current.setCustomValidity("Password don't match");
    } else {
      const user = {
        username: username.current.value,
        fullname: fullname.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      try {
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="content">
      <form className="loginContainer" onSubmit={handleClick}>
        <div className="loginLogo">
          <img src="assets/instagram-logo.png" />
        </div>
        <div className="loginInputs">
          <div className="loginInput">
            <input type="email" placeholder="Email" ref={email} required />
          </div>
          <div className="loginInput">
            <input
              type="text"
              placeholder="Full Name"
              ref={fullname}
              required
            />
          </div>
          <div className="loginInput">
            <input type="text" placeholder="Username" ref={username} required />
          </div>
          <div className="loginInput">
            <input
              type="password"
              placeholder="Password"
              ref={password}
              required
            />
          </div>
          <div className="loginInput">
            <input
              type="password"
              placeholder="Password Again"
              ref={passwordAgain}
              required
            />
          </div>
          <div className="loginButton">
            <button type="submit">{isFetching ? <CircularProgress size="20px"/> : "Sign Up"}</button>
          </div>
          <Link to="/login">
            <div className="loginButton">
              <button type="submit">Log In</button>
            </div>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
