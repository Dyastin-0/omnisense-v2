import clsx from "clsx";
import Tooltip from "./Tooltip";

const TruncatedText = ({ text, tooltip = true, className }) => {
  return tooltip ? (
    <Tooltip text={text}>
      <span className={clsx("block truncate", className)}>{text}</span>
    </Tooltip>
  ) : (
    <span className="block truncate">{text}</span>
  );
};

export default TruncatedText;
