import "./login.css";
import { useRef } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { loginCall } from "../../apiCalls";

function Login() {
  const email = useRef();
  const password = useRef();

  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div className="content">
      <form className="loginContainer" onSubmit={handleClick}>
        <div className="loginLogo">
          <img src="assets/instagram-logo.png" alt="" />
        </div>
        <div className="loginInputs">
          <div className="loginInput">
            <input type="email" placeholder="Email" ref={email} />
          </div>
          <div className="loginInput">
            <input type="password" placeholder="Password" ref={password} />
          </div>
          <div className="loginButton">
            <button type="submit">{isFetching ? "loading" : "Log In"}</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
