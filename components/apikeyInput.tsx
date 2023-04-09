import { useState } from "react";
import { useKeyStore } from "stores/key";
import { cn } from "@/utils/tailwind";

const ApikeyInput = (props) => {
  const regex = /^sk-\w{48}$/;
  const { setApikey, apikey, toggleEditApikey } = useKeyStore();
  const [input, setInput] = useState(apikey);
  const [error, setError] = useState(null);

  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (regex.test(input)) {
        setApikey(input);
        setInput("");
        setError(null);
        toggleEditApikey(false);
      } else {
        setError("Invalid api key");
      }
    }
  };

  const _handleChange = (e) => {
    setInput(e.target.value);
    setError(null);
  };

  const _handleCancel = (e) => {
    if (regex.test(apikey)) {
      toggleEditApikey(false);
    }
  };

  return (
    <div className="relative  h-full w-full max-w-[700px]">
      <div className="justify-content align-center clear-both m-auto flex h-[calc(100%_-_6.5rem)] w-full flex-grow items-center justify-start text-gray-300 dark:text-gray-700">
        <div className="mx-4 mt-4 flex w-full flex-col text-xs">
          <label className="mr-1 mb-2 flex flex-row text-gray-700">
            Enter your OpenAI API key
            <a
              href="https://platform.openai.com/account/api-keys"
              target="_blank"
              className={cn("ml-2 text-xs text-gray-500 underline")}
            >
              Get Key ↗
            </a>
          </label>
          <label className="mr-1 mb-4 flex flex-row text-gray-700">
            The API key is stored in your browser's localstorage.
            <a
              href="https://lohxt.space"
              target="_blank"
              className={cn("ml-1 text-xs text-gray-500 underline")}
            >
              Verify for yourself
            </a>
          </label>
          <input
            type="text"
            aria-label="chat input"
            required
            className="w-full min-w-0 flex-auto appearance-none border border-gray-200 bg-white px-3 py-[calc(theme(spacing.2)-1px)] text-gray-500 shadow-md shadow-zinc-800/5 placeholder:text-gray-300 focus:outline-none dark:border-gray-900 dark:bg-black placeholder:dark:text-gray-800 sm:text-sm"
            value={input}
            placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            onKeyDown={_handleKeyDown}
            onChange={_handleChange}
          />
          <label className="mr-1 mt-2 text-[#f50]">
            {error || <>&nbsp;&nbsp;</>}
          </label>
          <button
            className="mb-4 mr-2 w-fit rounded-sm border border-slate-500 px-2 py-1 text-gray-700 disabled:opacity-50 dark:text-gray-300"
            onClick={_handleCancel}
            disabled={!regex.test(apikey)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApikeyInput;
