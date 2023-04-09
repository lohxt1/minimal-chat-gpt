import React from "react";
import { cn } from "utils/tailwind";
import GithubStar from "../shared/giithubStar";

const Footer: React.FC = () => {
  return (
    <nav
      className={cn(
        "flex w-fit w-full flex-col items-center justify-center",
        // "mt-5 px-5 py-5",
        "m-5",
        "absolute",
        "right-0 bottom-0",
        "text-sm text-gray-500",
        // "border-b border-slate-900",
      )}
    >
      <div
        className={cn(
          "flex w-fit flex-row items-center justify-between",
          "ml-5",
          //   "mt-5 px-5 py-5",
        )}
      >
        <label>Crafted with</label>
        <label className="mx-1 text-gray-700 dark:text-gray-400">nextJS</label>
        <label className="mr-1">+</label>
        <label className="mr-1 text-gray-700 dark:text-gray-400">
          tailwindCSS
        </label>
        <label className="mr-1">+</label>
        <label className="text-gray-700 dark:text-gray-400">
          framer-motion
        </label>
        <label className="ml-4 text-sm text-gray-700 dark:text-gray-300">
          →
        </label>
        <GithubStar />
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

export default Footer;
