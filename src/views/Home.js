import { useEffect, useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import Entry from "../components/Entry";

function Home() {
  const user = localStorage.getItem("user");
  const { logout, getEntries } = useContext(UserContext);

  let navigate = useNavigate();

  async function signOut() {
    const res = await logout();
    if (res.status === 200) {
      navigate("/auth");
    }
  }

  async function getEntriesLocal() {
    const res = await getEntries();
    res.forEach((entry) => {
      setEntries((oldArr) => [...oldArr, entry]);
    });
  }

  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user === null) {
        navigate("/auth");
      } else {
        await getEntriesLocal();
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center mx-3">
      <h2 className="text-center text-white text-2xl">Welcome, {user}</h2>
      <h3 className="text-center text-white text-xl">
        What are you thinking today?
      </h3>
      <div className="flex flex-row">
        <Link
          className="btn bg-red-600 text-white font-bold my-3 mr-1 hover:bg-black"
          to="/new-entry"
        >
          New Entry
        </Link>
        <button
          className="btn bg-red-600 text-white font-bold my-3 ml-1 hover:bg-black"
          onClick={signOut}
        >
          Log Out
        </button>
      </div>

      <h3 className="text-center text-white mb-1">Your latest entries</h3>

      {entries.length > 0 ? (
        entries.map((entry) => {
          return (
            <Entry
              title={entry.title}
              content={entry.entry}
              date={entry.inserted_at}
            />
          );
        })
      ) : (
        <p className="text-white text-sm">
          You still haven't created your first entry. Get started on your
          journaling journey today!
        </p>
      )}
    </div>
  );
}

export default Home;
