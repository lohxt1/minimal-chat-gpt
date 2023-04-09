import { NextPage } from "next";
import { useKeyStore } from "stores/key";
import ApikeyInput from "@/components/apikeyInput";
import { Chat } from "@/components/chat";
import History from "@/components/history";
import { cn } from "@/utils/tailwind";

const Home: NextPage = () => {
  const { apikey, editApikey } = useKeyStore();
  return (
    <div
      className={cn(
        "flex h-[calc(100%_-_3.5rem)] w-screen items-center justify-center align-middle",
      )}
    >
      {!apikey || editApikey ? (
        <>
          <ApikeyInput />
        </>
      ) : (
        <>
          <History />
          <Chat />
        </>
      )}
    </div>
  );
};

export default Home;
