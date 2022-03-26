import { useEffect, useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Entry from "../components/Entry";
import { supabase } from "../supabaseClient";

function Home() {
  const user = localStorage.getItem("user");
  const { logout, getUserId } = useContext(UserContext);

  let navigate = useNavigate();

  useEffect(async () => {
    if (user === null) {
      navigate("/auth");
    } else {
      await getEntries();
    }
  }, []);

  async function signOut() {
    const res = await logout();
    if (res.status === 200) {
      navigate("/auth");
    }
  }

  async function getEntries() {
    try {
      const { data, error } = await supabase.from("entries").select("*");
      if (error) throw error;
      setEntries([]);
      data.forEach((entry) => {
        console.log(entry);
        setEntries((oldEntries) => [...oldEntries, entry]);
      });
    } catch (error) {
      console.log(error);
    }
  }

  const [entries, setEntries] = useState([]);

  return (
    <div className="flex flex-col items-center mx-3">
      <h2 className="text-center text-white text-2xl">Bienvenido, {user}</h2>
      <h3 className="text-center text-white text-xl">
        ¿En qué estás pensando hoy?
      </h3>
      <div className="flex flex-row">
        <Link
          className="btn bg-red-600 text-white font-bold my-3 mr-1 hover:bg-black"
          to="/new-entry"
        >
          Nueva entrada
        </Link>
        <button
          className="btn bg-red-600 text-white font-bold my-3 ml-1 hover:bg-black"
          onClick={signOut}
        >
          Cerrar Sesión
        </button>
      </div>

      <h3 className="text-center text-white mb-1">Tus entradas anteriores</h3>
      {entries.map((entry) => {
        return (
          <Entry
            title={entry.title}
            content={entry.entry}
            date={entry.inserted_at}
          />
        );
      })}
    </div>
  );
}

export default Home;
