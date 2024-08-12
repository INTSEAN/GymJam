import React, { useEffect, useState } from "react";
import Button from "./Button";
import axios from "axios";

export default function Hero(props) {
  const {
    clientID = process.env.REACT_APP_SPOTIFY_CLIENT_ID,
    endPoint = process.env.REACT_APP_SPOTIFY_AUTH_ENDPOINT,
    redirect = process.env.REACT_APP_SPOTIFY_REDIRECT_URI,
    response = "token",
    token,
    setToken,
  } = props;
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState("");

  useEffect(() => {
    if (token) {
      axios
        .get("https://api.spotify.com/v1/me/playlists", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setPlaylists(response.data.items);
          if (response.data.items.length > 0) {
            setSelectedPlaylist(response.data.items[0].id);
          }
        })
        .catch((error) => {
          console.error("Error fetching playlists", error);
          if (error.response) {
            if (error.response.status === 429) {
              console.error("Rate limit exceeded. Please try again later.");
            } else if (error.response.status === 401) {
              setToken("");
              window.localStorage.removeItem("token");
              window.location.href = redirect;
            }
          } else {
            console.error("Network error or Spotify API issue.");
          }
        });
    }
  }, [token]);

  function handleRedirect() {
    window.location.href = `${endPoint}?client_id=${clientID}&redirect_uri=${redirect}&response_type=${response}`;
  }
  function logoutApp() {
    setToken("");
    window.localStorage.removeItem("token");
    window.location.href = redirect;
  }

  return (
    <>
      {token ? (
        <div className="flex flex-col gap-4 items-center justify-center py-4">
          <h1 className="font-bold text-1xl sm:text-1xl md:text-3xl lg:text-4xl">
            GOING SO <span className="text-green-400">SOON? 😭 </span>
          </h1>
          <Button func={logoutApp} text="Logout">
            {" "}
          </Button>
          {/* Spotify Embed */}
          {playlists.length > 0 ? (
            <div className="w-full max-w-md mx-auto text-center">
              <label
                htmlFor="playlist-select"
                className="text-sm font-medium text-gray-400"
              >
                Choose a playlist to start jamming:
              </label>
              <select
                id="playlist-select"
                onChange={(e) => setSelectedPlaylist(e.target.value)}
                value={selectedPlaylist}
                className="w-full rounded-md bg-slate-900 text-white border border-gray-600 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent appearance-none mt-2"
              >
                <option value="" disabled>
                  Select a playlist to start jamming
                </option>
                {playlists.map((playlist) => (
                  <option value={playlist.id} key={playlist.id}>
                    {playlist.name}
                  </option>
                ))}
              </select>

              <iframe
                src={`https://open.spotify.com/embed/playlist/${selectedPlaylist}`}
                width="540"
                height="80"
                frameBorder="0"
                allowtransparency="true"
                allow="encrypted-media"
                className="mt-4"
              ></iframe>
            </div>
          ) : (
            <p className="text-gray-400">
              No playlists found. Please create a playlist on Spotify.
            </p>
          )}
        </div>
      ) : (
        <div></div>
      )}
      <div
        className="min-h-screen flex flex-col gap-10 items-center justify-center text-center
       max-w-[800px] w-full mx-auto p-4"
      >
        <div className="flex flex-col gap-4">
          <p>IT'S TIME FOR</p>
          <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            GYM <span className="text-green-400">JAM</span>
          </h1>
        </div>
        <p className="text-sm md:text-base font-light">
          I hereby acknowledge that I may become unbelievably amazed by the
          music <span className="text-green-400 font-medium">jams</span> during
          my <span className="text-green-400 font-medium">gym</span> experience
          and accept all risks of becoming entertained, and plagued by not being
          able to{" "}
          <span className="text-green-400 font-medium">
            resist dancing in front of other people.
          </span>
        </p>

        {!token ? (
          <div>
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl py-3">
              FIRST <span className="text-green-400">LOGIN</span>
            </h1>
            <Button func={handleRedirect} text="Login into Spotify">
              {" "}
            </Button>{" "}
          </div>
        ) : (
          <div>
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              GET YOUR <span className="text-green-400">EXERCISE</span>
            </h1>
            <div className="flex flex-col gap-10">
              <Button
                func={() => {
                  window.location.href = "#generate";
                }}
                text="Accept and Begin"
              ></Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
