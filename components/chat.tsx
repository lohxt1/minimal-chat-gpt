import { useEffect, useRef, useState } from "react";
import { useHistoryStore } from "stores/history";
import { useKeyStore } from "stores/key";
import { ChatBlock, type ChatGPTMessage } from "./chatBlock";

export function Chat() {
  const [loading, setLoading] = useState(false);

  const { apikey } = useKeyStore();
  const { setCurrentChatId, messages, setHistory } = useHistoryStore();

  useEffect(() => {
    // Initiate new chat
    setCurrentChatId();
  }, []);

  // send message to API /api/chat endpoint
  const sendMessage = async (message: string, index?: number) => {
    setLoading(true);

    // if a previous message is edited and submitted, ignore all the following messages.
    let _index = index >= 0 ? index : 1000;
    let _messages = messages.slice(0, _index + 1);

    // append the new/edited message to the list of messages
    const newMessages = [
      ..._messages,
      { role: "user", content: message } as ChatGPTMessage,
    ];

    // update the store
    setHistory(newMessages);

    // last 10 messages will be sent for context
    const last10messages = newMessages.slice(-10);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: last10messages,
        apikey,
      }),
    });

    console.log("Edge function returned.");

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    let lastMessage = "";

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      lastMessage = lastMessage + chunkValue;

      let _messages = [
        ...newMessages,
        { role: "assistant", content: lastMessage } as ChatGPTMessage,
      ];

      // update the store
      setHistory(_messages);

      // reset loading status
      setLoading(false);
    }
  };

  return (
    <div className="relative flex h-full max-w-full flex-1 flex-col items-center justify-center">
      <div className="relative h-full w-full max-w-[700px]">
        <div className="relative h-full overflow-scroll">
          {messages.map(({ content, role }, index) => (
            <ChatBlock
              key={index}
              role={role}
              content={content}
              sendMessage={sendMessage}
              index={index}
            />
          ))}
          {loading && <LoadingChatLine />}
          {messages.length < 1 && (
            <div className="justify-content align-center clear-both m-auto flex h-[calc(100%_-_6.5rem)] w-full flex-grow items-center justify-center text-gray-300 dark:text-gray-700">
              Type a message to start the conversation
            </div>
          )}
          <div className="h-18 relative flex w-full md:h-24"></div>
          <ScrollToBlock loading={loading} messages={messages} />
        </div>
        <div className="align-center h-18 absolute bottom-0 left-0 flex w-full items-center justify-center border-t border-gray-100 bg-white pt-2 dark:border-gray-900 dark:bg-black md:h-24">
          <InputMessage sendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
}

// loading placeholder animation for the chat line
const LoadingChatLine = () => (
  <div
    className={
      "relative float-left clear-both w-full animate-pulse border-b border-gray-100 px-2 dark:border-gray-900"
    }
  >
    <div className="mb-5 flex w-full flex-row flex-wrap py-2">
      <div className="flex w-full flex-row">
        <p className="font-large text-xxl mr-2 text-gray-900 dark:text-gray-100">
          <div className="align-center flex h-6 w-6 items-center justify-center rounded-sm border border-gray-300 text-center text-xs">
            AI
          </div>
        </p>
        <div className="w-full space-y-4 pt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-2 rounded bg-zinc-500"></div>
            <div className="col-span-1 h-2 rounded bg-zinc-500"></div>
          </div>
          <div className="h-2 rounded bg-zinc-500"></div>
        </div>
      </div>
    </div>
  </div>
);

const ScrollToBlock = (props) => {
  const { loading, messages } = props;
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }, [loading, messages]);

  return <div className="relative flex h-[1px] w-full" ref={ref}></div>;
};

const InputMessage = ({ sendMessage }: any) => {
  const [input, setInput] = useState("");

  return (
    <div className="clear-both mt-6 flex w-full">
      <input
        type="text"
        aria-label="chat input"
        required
        placeholder="Send a message..."
        className="ml-2 min-w-0 flex-auto appearance-none border border-gray-200 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:outline-none dark:border-gray-900 dark:border-gray-900 dark:bg-black sm:text-sm"
        value={input}
        onKeyDown={(e) => {
          if (e.key === "Enter" && input.length > 0) {
            sendMessage(input);
            setInput("");
          }
        }}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <button
        type="submit"
        className="mx-2 flex-none"
        disabled={input.length <= 0}
        onClick={() => {
          if (input.length <= 0) return;
          sendMessage(input);
          setInput("");
        }}
      >
        →
      </button>
    </div>
  );
};
