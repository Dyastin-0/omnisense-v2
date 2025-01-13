import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Omnisense from "./Omnisense";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const SplashScreen = () => {
  return (
    <div className="absolute flex flex-col gap-2 justify-center items-center inset-0 bg-secondary text-2xl z-50">
      <Omnisense />
      <FontAwesomeIcon icon={faSpinner} size="sm" spin />
    </div>
  );
};

export default SplashScreen;
