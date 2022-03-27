import { useState } from "react";
import { supabase } from "../supabaseClient";

function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  async function signUp(e) {
    e.preventDefault();
    if (password === newPassword) {
      try {
        const { user, session, error } = await supabase.auth.signUp({
          email: email,
          password: password,
        });
        console.log(user);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Passwords don't match");
    }
  }

  return (
    <div className="flex flex-col items-center w-full">
      <h2>Register</h2>
      <form onSubmit={signUp}>
        <input
          type="email"
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
        <input
          type="password"
          className="input mb-2"
          placeholder="Confirm Password"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button className="btn btn-black w-full mb-2" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
