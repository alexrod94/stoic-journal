import { useNavigate } from "react-router-dom";

function ReturnButton({ text, func }) {
  let navigate = useNavigate();
  return (
    <button
      className="btn bg-red-600 text-white font-bold my-3 mr-1 hover:bg-black flex flex-row items-center"
      onClick={func}
    >
      <svg
        className="w-3 h-3 dark:text-white mr-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          //   stroke-linecap="round"
          //   stroke-linejoin="round"
          strokeWidth="2"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        ></path>
      </svg>
      {text}
    </button>
  );
}

export default ReturnButton;
