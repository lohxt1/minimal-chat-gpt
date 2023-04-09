import { useHistoryStore } from "stores/history";

const History = (props) => {
  const { history, setCurrentChatId, deleteHistory } = useHistoryStore();

  const _handleClick = (id) => (e) => {
    setCurrentChatId(id);
  };

  const _handleNew = (e) => {
    setCurrentChatId();
  };

  const _handleDelete = (idx) => (e) => {
    deleteHistory(idx);
  };

  return (
    <div className="flex h-full w-full flex-col border-r border-gray-100 dark:border-gray-900 md:w-[250px]">
      <div className="flex justify-between border-b border-gray-100 py-4 px-2 text-gray-700 dark:border-gray-900 dark:text-gray-300">
        <label className="underline decoration-dashed">History</label>
        <label
          className="align-center flex cursor-pointer items-center border border-gray-500 px-1 text-xs"
          onClick={_handleNew}
        >
          New +
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

export default History;
