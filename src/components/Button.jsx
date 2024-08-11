import React from "react";

export default function Workout(props) {
  const { text, func } = props;
  return (
    <>
      <button
        onClick={func}
        className="px-8 py-4 mx-auto rounded-medium border-[2px] bg-slate-950 border-green-400 border-solid greenShadow duration-200"
      >
        <p>{text}</p>
      </button>
    </>
  );
}
