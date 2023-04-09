import React from "react";
import { useTheme } from "next-themes";
import { cn } from "utils/tailwind";
import Apikey from "../shared/apikey";
import GithubStar from "../shared/giithubStar";

const Header: React.FC = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const _handleModeClick = (e) => {
    e.preventDefault();
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  return (
    <nav
      className={cn(
        "flex w-full justify-end",
        "px-2",
        "relative",
        "right-0 top-0",
        "border-b border-gray-100 dark:border-gray-900",
        // "border-b border-slate-900",
      )}
    >
      <div
        className={cn(
          "flex h-14 w-full items-center justify-between align-middle md:min-w-[1/3] lg:min-w-[1/4]",
          "dark:border-white",
          "z-10",
        )}
      >
        <pre className="italic">chatGPT-minimal</pre>
        <div
          className={cn(
            "flex w-fit items-center justify-between align-middle",
            " px-2",
            "font-medium",
          )}
        >
          <div className={cn("flex items-center")}>
            <Apikey />
            <GithubStar />
          </div>
          <button
            aria-label="Toggle Dark Mode"
            type="button"
            className={cn(
              "flex h-9 w-9 items-center justify-center",
              // "bg-gray-200",
              "rounded-lg",
              "transition-all",
            )}
            onClick={_handleModeClick}
          >
            {currentTheme != "dark" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                ></path>
              </svg>
            )}
          </button>
        </div>
      </div>
      <style jsx>{`
        nav {
          display: flex;
          align-items: center;
        }
      `}</style>
    </nav>
  );
};

export default Header;
