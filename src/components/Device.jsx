import { setToggleState } from "../helpers/data-helper";
import useAuth from "../hooks/useAuth";
import useToast from "./hooks/useToast";
import Toggle from "./Toggle";

const Device = ({ device }) => {
  const { toastInfo } = useToast();
  const { userDataPath, user } = useAuth();

  const { name } = device;

  const handleClick = (newState) => {
    if (!device.enabled) {
      toastInfo(`${deviceName} is disabled.`);
      return;
    }
    const action = newState ? "on" : "off";
    const message = {
      actionType: "stateToggle",
      action: action,
      name: name,
      sentBy: user.displayName,
      message: `turned ${action} the ${name}.`,
      timeSent: new Date().getTime(),
    };
    setToggleState(userDataPath, name, newState, message);
  };

  return (
    <div className="text-sm text-primary-foreground">
      <div className="flex justify-between items-center">
        <Toggle value={device.state} onClick={handleClick} />
        <span>{device?.name}</span>
      </div>
    </div>
  );
};

export default Device;
