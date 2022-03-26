import "./App.css";
import { UserProvider } from "./context/UserContext";
import UserContext from "./context/UserContext";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./views/Home";
import Auth from "./views/Auth";
import NewEntry from "./views/NewEntry";

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/new-entry" element={<NewEntry />} />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
