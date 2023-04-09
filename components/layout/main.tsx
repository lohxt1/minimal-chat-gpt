import React from "react";
import { cn } from "@/utils/tailwind";

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main
        className={cn(
          "container relative overflow-hidden",
          "h-[90%] w-full max-w-md md:h-[60%]",
          "mx-auto my-auto mt-2 md:mt-10",
          "px-10 pt-5",
          "shadow-xl shadow-[#0001]",
        )}
      >
        {children}
      </main>
      <style jsx>
        {`
          main::after {
            content: "";
            pointer-events: none;
            user-select: none;
            position: absolute;
            inset: 0px;
            border-radius: inherit;
            padding: 1px;
            backdrop-filter: blur(5px);
            background: linear-gradient(
              rgba(0, 0, 0, 0.7),
              rgba(255, 255, 255, 0.07)
            );
            mask-mode: match-source, match-source;
            mask-repeat: repeat, repeat;
            mask-clip: content-box, border-box;
            mask-origin: content-box, border-box;
            mask-position: 0% 0%, 0% 0%;
            mask-size: auto, auto;
            mask-image: linear-gradient(black, black),
              linear-gradient(black, black);
            mask-composite: exclude;
          }
        `}
      </style>
    </>
  );
};

export default Main;
