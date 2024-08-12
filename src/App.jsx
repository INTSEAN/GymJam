import Hero from "./components/Hero";
import Workout from "./components/Workout";
import Generator from "./components/Generator";
import { useState, useEffect } from "react";
import { generateWorkout } from "./utils/functions";

function App() {
  const [workout, setWorkout] = useState(null);

  const [poison, setPoison] = useState("individual");
  const [muscles, setMuscle] = useState([]);
  const [goal, setGoal] = useState("strength_power");

  const [token, setToken] = useState("");

  // const CLIENT_ID = "2eb1465c81ce463584d6a610798d4fc5";
  // const REDIRECT_URI = "https://gymjam.netlify.app/";
  // const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const AUTH_ENDPOINT = process.env.REACT_APP_SPOTIFY_AUTH_ENDPOINT;
  const REDIRECT_URI = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
  const RESPONSE_TYPE = "token";

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token);
  }, []);

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
      <Hero
        redirect={REDIRECT_URI}
        clientID={CLIENT_ID}
        endPoint={AUTH_ENDPOINT}
        response={RESPONSE_TYPE}
        token={token}
        setToken={setToken}
      />
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
