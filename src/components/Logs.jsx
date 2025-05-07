import { useEffect, useRef } from "react";
import useData from "../hooks/useData";
import Log from "./Log";

const Logs = () => {
  const { messages } = useData();

  const logsRef = useRef(null);

  useEffect(() => {
    if (logsRef.current) {
      logsRef.current.scrollTop = logsRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex lg:col-span-1 md:col-span-2 col-span-2 flex-col w-full h-[calc(250px+1rem)] gap-2 p-2 bg-primary rounded-md">
      <h1 className="text-md text-center text-primary-foreground font-semibold">
        Logs
      </h1>
      <div
        className="flex flex-col h-[calc(100%-1.5rem)] gap-2 pr-2 overflow-y-auto
				scrollbar-thin scrollbar-track-transparent scrollbar-thumb-secondary-accent"
        ref={logsRef}
      >
        {messages &&
          messages.map((log, index) => <Log key={index} log={log} />)}
      </div>
    </div>
  );
};

export default Logs;
