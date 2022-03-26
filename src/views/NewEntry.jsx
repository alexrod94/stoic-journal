import ReturnButton from "../components/ReturnButton";
import { useNavigate } from "react-router-dom";

function NewEntry() {
  let navigate = useNavigate();

  const getBack = () => {
    navigate("/");
  };

  return (
    <>
      <div className="flex flex-row justify-between">
        <ReturnButton text="Back to the list" func={getBack} />
        <button className="btn btn-green">
          Save entry
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
            ></path>
          </svg>
        </button>
      </div>
      <div className="w-full px-3 box-border">
        <input
          className="bg-white my-1 p-3 rounded w-full"
          placeholder="Your title goes here"
        ></input>
      </div>
      <div className="w-full px-3 py-3 box-border">
        <textarea
          className="bg-white my-1 p-3 rounded w-full min-h-[400px]"
          placeholder="What are you thinking today?"
        ></textarea>
      </div>
    </>
  );
}

export default NewEntry;
