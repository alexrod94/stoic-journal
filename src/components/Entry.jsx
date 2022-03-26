import React from "react";
import { useEffect, useState } from "react";

function Entry({ title, content, date }) {
  const [correctDate, setDate] = useState("");
  useEffect(() => {
    const goodDate = date.split("T");
    setDate(goodDate[0].split("-").reverse().join("/"));
  }, []);

  return (
    <div className="bg-white w-full my-1 p-3 rounded">
      <h2 className="text-xl mb-1">{title}</h2>
      <span>{correctDate}</span>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  );
}

export default Entry;
