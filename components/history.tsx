import { useHistoryStore } from "stores/history";
import { cn } from "@/utils/tailwind";

const History = (props) => {
  const { history, setCurrentChatId, deleteHistory, toggleShowHistory } =
    useHistoryStore();

  const _handleClick = (id) => (e) => {
    setCurrentChatId(id);
    toggleShowHistory(false);
  };

  const _handleNew = (e) => {
    setCurrentChatId();
  };

  const _handleDelete = (idx) => (e) => {
    deleteHistory(idx);
  };

  const _handleHistoryClose = () => {
    toggleShowHistory(false);
  };

  return (
    <div
      className={cn(
        "absolute top-0 left-0 z-10 flex h-full w-full flex-col border-r border-gray-100 bg-white dark:border-gray-900 dark:bg-black md:relative md:w-[250px]",
      )}
    >
      <div className="flex justify-between border-b border-gray-100 py-4 px-2 text-gray-700 dark:border-gray-900 dark:text-gray-300">
        <label className="underline decoration-dashed">History</label>
        <label
          className="align-center flex hidden cursor-pointer items-center border border-gray-500 px-1 text-xs md:flex"
          onClick={_handleNew}
        >
          New +
        </label>
        <label
          className="align-center flex flex cursor-pointer items-center text-sm md:hidden"
          onClick={_handleHistoryClose}
        >
          Close
        </label>
      </div>
      {Object.keys(history).length <= 0 && (
        <div className="align-center flex h-full w-full items-center justify-center opacity-30">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12.5 12.5v20.834h20.834" />
            <path d="M12.706 54.166A37.5 37.5 0 1 0 25 22.086L12.5 33.334" />
            <path d="M50 29.166V50l16.666 8.334" />
          </svg>
        </div>
      )}
      {Object.keys(history).map((h) => (
        <div className="flex flex-row border-b border-gray-100 py-2 px-2 text-sm dark:border-gray-900">
          <label className="w-full cursor-pointer" onClick={_handleClick(h)}>
            {history[h][0]?.content}
          </label>
          <button
            className="ml-2 flex cursor-pointer align-baseline"
            onClick={_handleDelete(h)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

const HistoryWrapper = () => {
  const { showHistory } = useHistoryStore();
  return (
    <>
      <div className="hidden h-full w-full md:block md:w-[250px]">
        <History />
      </div>
      {showHistory && (
        <div className="block h-full w-full md:hidden md:w-[250px]">
          <History />
        </div>
      )}
    </>
  );
};

export default HistoryWrapper;
