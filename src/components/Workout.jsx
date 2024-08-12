import React from "react";
import SectionWrapper from "./SectionWrapper";
import ExerciseCard from "./ExerciseCard";

export default function Workout(props) {
  const { workout } = props;
  return (
    <div className="flex">
      {/* Add your Spotify API code here */}
      <div>
        {/* Existing div */}
        <SectionWrapper
          id={"workout"}
          header={"Welcome to"}
          title={["The", "JAM", "zone"]}
        >
          <div className="flex flex-col gap-4">
            {workout.map((exercise, i) => {
              return <ExerciseCard exercise={exercise} i={i} key={i} />;
            })}
          </div>
        </SectionWrapper>
      </div>
    </div>
  );
}
