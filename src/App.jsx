import Hero from "./components/Hero";
import Workout from "./components/Workout";
import Generator from "./components/Generator";
import { useState } from "react";
import { generateWorkout } from "./utils/functions";

function App() {
  const [workout, setWorkout] = useState(null);

  const [poison, setPoison] = useState("individual");
  const [muscles, setMuscle] = useState([]);
  const [goal, setGoal] = useState("strength_power");

  function updateWorkout() {
    if (muscles.length < 1) {
      return;
    }
    let newWorkout = generateWorkout({ poison, muscles, goal });
    setWorkout(newWorkout);
    window.location.href = "#workout";
  }

  return (
    <main
      className="min-h-screen flex flex-col bg-gradient-to-r from-slate-800 
      to-slate-950 text-white test-sm sm:text-base"
    >
      <Hero />
      <Generator
        poison={poison}
        setPoison={setPoison}
        muscles={muscles}
        setMuscle={setMuscle}
        goal={goal}
        setGoal={setGoal}
        updateWorkout={updateWorkout}
      />

      {workout && <Workout workout={workout} />}
    </main>
  );
}

export default App;
