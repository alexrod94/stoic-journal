import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

function Login() {
  const { user, getUser, login } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  async function signIn(e) {
    e.preventDefault();
    await login(email, password);
    navigate("/");
  }

  return (
    <div className="flex flex-col items-center w-full">
      <h2>Login</h2>
      <form onSubmit={signIn}>
        <input
          type="text"
          className="input my-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="input mb-2"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-black w-full mb-2" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
