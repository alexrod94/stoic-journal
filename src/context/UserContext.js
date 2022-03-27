import { createContext, useState } from "react";
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
      const { data, error } = await supabase
        .from("entries")
        .select("*")
        .order("id", { ascending: false })
        .limit(10);
      if (error) throw error;
      const entries = data;
      return entries;
    } catch (error) {
      console.log(error);
    }
  }

  async function saveEntry(title, content) {
    const id = getUserId();
    try {
      const { data, error } = await supabase
        .from("entries")
        .insert({ user_id: id, title: title, entry: content });
      if (error) throw error;
      return {
        status: 200,
        data,
      };
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <UserContext.Provider
      value={{ user, login, logout, getUserId, getEntries, saveEntry }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
