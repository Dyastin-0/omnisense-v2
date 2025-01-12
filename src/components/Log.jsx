import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import useAuth from "../hooks/useAuth";
import clsx from "clsx";

dayjs.extend(relativeTime);

const Log = ({ log }) => {
  const { user } = useAuth();
  const { message, sentBy, timeSent } = log;

  const isSender = sentBy == user.displayName;

  return (
    <div
      className={clsx(
        "flex flex-col gap-1 text-sm text-primary-foreground",
        isSender && "text-right"
      )}
    >
      <span className="text-xs text-secondary-foreground">
        {`${sentBy} · ${dayjs.unix(timeSent / 1000).fromNow()}`}
      </span>
      <span className="bg-secondary p-1 rounded-md">{message}</span>
    </div>
  );
};

export default Log;
