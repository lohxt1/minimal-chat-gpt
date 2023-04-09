import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/tailwind";

type ChatGPTAgent = "user" | "system" | "assistant";

export interface ChatGPTMessage {
  role: ChatGPTAgent;
  content: string;
}

interface ChatBlockProps extends ChatGPTMessage {
  sendMessage: (string) => void;
  index: number;
}

export const ChatBlock = ({
  role = "assistant",
  content,
  sendMessage,
  index,
}: ChatBlockProps) => {
  return (
    <div className="relative flex flex-col border-b border-gray-100 dark:border-gray-900">
      <ChatLine
        role={role}
        content={content}
        sendMessage={sendMessage}
        index={index}
      />
    </div>
  );
};

const ChatLine = ({
  role = "assistant",
  content,
  sendMessage,
  index,
}: ChatBlockProps) => {
  if (!content) {
    return null;
  }

  // util helper to convert new lines to <br /> tags
  const convertNewLines = (text: string) =>
    text.split("\n").map((line, i) => (
      <span key={i}>
        {line}
        <br />
      </span>
    ));

  const formatteMessage = convertNewLines(content);

  const [edit, toggleEdit] = useState(false);

  return (
    <div
      className={cn(
        "relative float-left clear-both w-full px-2 pt-2",
        role == "assistant" ? "bg-[#00000004] dark:bg-[#ffffff04]" : "",
      )}
    >
      <div className="mb-5 flex flex-row flex-wrap py-2">
        <div className="flex w-full flex-row">
          <p className="font-large text-xxl mr-2 mt-2 text-gray-900 dark:text-gray-100">
            <div className="align-center flex h-6 w-6 items-center justify-center rounded-sm border border-gray-300 text-center text-xs">
              {role == "assistant" ? "AI" : ":D"}
            </div>
          </p>
          {edit ? (
            <InputEdit
              content={content}
              sendMessage={sendMessage}
              index={index}
            />
          ) : (
            <p
              className={cn(
                "text-sm leading-6 md:text-base md:leading-8",
                role == "assistant" ? "" : "text-gray-500",
              )}
            >
              {formatteMessage}
            </p>
          )}
        </div>
      </div>
      {role != "assistant" && (
        <button
          className="absolute top-0 right-0 mx-1 my-2 w-fit cursor-pointer rounded-sm px-2 py-4 text-2xl disabled:opacity-50"
          onClick={() => {
            toggleEdit((_) => !_);
          }}
        >
          {edit ? (
            <div className="h-[15px] w-[15px] leading-[10px]">×</div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m11.25 1.25 2.5 2.5m-9.062 9.063 7.187-7.188-2.5-2.5-7.188 7.188-.937 3.437z" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
};

const InputEdit = (props) => {
  const { content, sendMessage, index } = props;
  const textareaRef = useRef<HTMLTextAreaElement>();
  const [textareaHeight, setTextareaHeight] = useState(0);

  const [input, setInput] = useState(content);

  useEffect(() => {
    if (textareaRef?.current?.scrollHeight) {
      setTextareaHeight(textareaRef.current.scrollHeight);
    }
  }, [content, input]);

  const _handleSubmit = (e) => {
    sendMessage(input, index);
  };

  return (
    <div className="flex w-full flex-col border border-gray-100 dark:border-gray-900">
      <>
        <textarea
          ref={textareaRef}
          style={{
            height: textareaHeight ? `${textareaHeight}px` : "auto",
          }}
          className={cn(
            "h-auto w-full bg-transparent outline-none focus:outline-none",
            "text-sm leading-6 md:text-base md:leading-8",
          )}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      </>
      <button
        className="mx-2 mb-4 mr-2 w-fit rounded-sm border border-slate-500 px-2 py-1 disabled:opacity-50"
        onClick={_handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};
