import React from "react";
import Button from "./Button";

export default function Hero() {
  return (
    <>
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
        <Button
          func={() => {
            window.location.href = "#generate";
          }}
          text="Accept and Begin"
        ></Button>
      </div>
    </>
  );
}
