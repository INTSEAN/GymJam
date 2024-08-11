import React, { useState } from "react";
import SectionWrapper from "./SectionWrapper";
import { SCHEMES, WORKOUTS } from "../utils/swoldier";
import Button from "./Button";

function Header(props) {
  const { index, title, description } = props;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center gap-2">
        <p className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-400">
          {index}
        </p>
        <h4 className="text-xl sm:text-2xl md:text-3xl">{title}</h4>
      </div>
      <p className="text-sm sm:text-base  mx-auto">{description}</p>
    </div>
  );
}

export default function Generator(props) {
  const [showModal, setModal] = useState(false);
  const {
    poison,
    setPoison,
    muscles,
    setMuscle,
    goal,
    setGoal,
    updateWorkout,
  } = props;

  function toggleModal() {
    setModal(!showModal);
  }

  function updateMuscles(muscleGroup) {
    if (muscles.includes(muscleGroup)) {
      setMuscle(muscles.filter((val) => val !== muscleGroup));
      return;
    }

    if (muscles.length > 2) {
      return;
    }
    if (poison !== "individual") {
      setMuscle([muscleGroup]);
      setModal(false);
      return;
    }

    setMuscle([...muscles, muscleGroup]);
    if (muscles.length === 2) {
      setModal(false);
    }
  }

  return (
    <>
      <SectionWrapper
        id={"generate"}
        header={"Generate your music"}
        title={["It's", "Jam", "o'clock"]}
      >
        <Header
          index={"01"}
          title={"Pick your favorite"}
          description={"Select the workout you wish to enjoy"}
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Object.keys(WORKOUTS).map((type, typeIndex) => {
            return (
              <button
                onClick={() => {
                  setMuscle([]);
                  setPoison(type);
                }}
                className={
                  "bg-slate-950 border duration-200 hover:border-green-600 py-3 rounded-lg " +
                  (type === poison ? "border-green-600" : "border-green-400")
                }
                key={typeIndex}
              >
                <p className="capitalize">{type.replace("_", " ")}</p>
              </button>
            );
          })}
        </div>
        <Header
          index={"02"}
          title={"Lock on targets"}
          description={"Select the muscles to use for your vibe sesh"}
        />
        <div className="bg-slate-950 py-3 border border-solid border-green-400 rounded-lg flex flex-col">
          <button
            onClick={toggleModal}
            className="relative flex p-3 items-center justify-center"
          >
            <p className="capitalize">
              {" "}
              {muscles.length == 0
                ? "Select muscle groups"
                : muscles.join(" ")}{" "}
            </p>
            <i className="fa-solid absolute right-3 top-1/2 -translate-y-1/2 fa-caret-down"></i>
          </button>
          {showModal && (
            <div className=" flex flex-col px-3 pb-3 bg-slate-950 border border-solid border-green-400 rounded-lg p-3">
              {(poison === "individual"
                ? WORKOUTS[poison]
                : Object.keys(WORKOUTS[poison])
              ).map((muscleGroup, muscleGroupIndex) => {
                return (
                  <button
                    onClick={() => {
                      updateMuscles(muscleGroup);
                    }}
                    key={muscleGroupIndex}
                    className={
                      "hover:text-green-400  px-4 duration-200 " +
                      (muscles.includes(muscleGroup) ? "text-green-400" : " ")
                    }
                  >
                    <p className="uppercase">{muscleGroup.replace("_", " ")}</p>
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <Header
          index={"03"}
          title={"Become ripped"}
          description={"Select the your ultimate dance battle."}
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Object.keys(SCHEMES).map((scheme, schemeIndex) => {
            return (
              <button
                onClick={() => {
                  setGoal(scheme);
                }}
                className={
                  "bg-slate-950 border duration-200  px-4  hover:border-green-600 py-3 rounded-lg " +
                  (scheme === goal ? "border-green-600" : "border-green-400")
                }
                key={schemeIndex}
              >
                <p className="capitalize">{scheme.replace("_", " ")}</p>
              </button>
            );
          })}
        </div>
      </SectionWrapper>
      <Button func={updateWorkout} text="Formulate"></Button>
    </>
  );
}
