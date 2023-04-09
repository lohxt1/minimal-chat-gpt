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
      {Object.keys(history).map((h) => (
        <div className="flex flex-row border-b border-gray-100 py-2 px-2 text-sm dark:border-gray-900">
          <label className="w-full cursor-pointer" onClick={_handleClick(h)}>
            {history[h][0]?.content}
          </label>
          <button className="ml-2 cursor-pointer" onClick={_handleDelete(h)}>
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
