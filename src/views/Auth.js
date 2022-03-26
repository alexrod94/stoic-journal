import Login from "../components/Login";
import Register from "../components/Register";
import { useState } from "react";

function Auth() {
  let [view, changeView] = useState(false);
  function setView() {
    let oldState = view;
    changeView(!oldState);
  }

  return (
    <div className="h-screen flex flex-col justify-center">
      <div className="w-96 mx-auto flex flex-col items-center bg-white rounded p-4">
        <h1 className="text-xl font-bold">Stoic Journal</h1>
        {view ? <Register /> : <Login />}
        <button className="text-xs hover:text-blue-500" onClick={setView}>
          {view ? "Already a member?" : "Not registered yet?"}
        </button>
      </div>
    </div>
  );
}

export default Auth;
