import { createContext, useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const login = async (email, password) => {
    try {
      const { user, error } = await supabase.auth.signIn({
        email,
        password,
      });
      if (error) throw error;
      setUser(user);
      localStorage.setItem("user", user.email);
      return { status: 200 };
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      localStorage.removeItem("user");
      return { status: 200 };
    } catch (error) {
      console.log(error);
    }
  };

  const getUserId = () => {
    const session = localStorage.getItem("supabase.auth.token");
    const sessionObj = JSON.parse(session);
    const user = sessionObj.currentSession.user;
    const id = user.id;
    return id;
  };

  async function getEntries() {
    // const id = getUserId();
    try {
      const { data, error } = await supabase.from("entries").select("*");
      if (error) throw error;
      const entries = [];
      data.forEach((entry) => {
        entries.push(entry);
      });
      return entries;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <UserContext.Provider
      value={{ user, login, logout, getUserId, getEntries }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
