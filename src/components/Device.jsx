import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import Toggle from "./Toggle";
import Button from "./ui/Button";
import { setToggleState } from "../helpers/data-helper";
import useToast from "./hooks/useToast";
import useAuth from "../hooks/useAuth";
import useModal from "./hooks/useModal";
import DeviceModal from "./modals/DeviceModal";

const Device = ({ device }) => {
  const { setModal, setOpen } = useModal();
  const { toastInfo } = useToast();
  const { user, userDataPath } = useAuth();

  const handleClick = (newState) => {
    if (!device.enabled) {
      toastInfo(`${device.name} is disabled.`);
      return;
    }
    const action = newState ? "on" : "off";
    const message = {
      actionType: "stateToggle",
      action: action,
      name: device.name,
      sentBy: user.displayName,
      message: `turned ${action} the ${device.name}.`,
      timeSent: new Date().getTime(),
    };
    setToggleState(userDataPath, device.name, newState, message);
  };

  return (
    <div className="flex text-xs gap-2 text-primary-foreground">
      <div className="flex w-full justify-between items-center">
        <Toggle value={device.state} onClick={handleClick} />
        <span>{device.name}</span>
      </div>
      <Button
        variant="ghost"
        icon={faEllipsisV}
        className="h-full p-0"
        onClick={() => {
          setModal(
            <DeviceModal
              deviceName={device.name}
              handleStateChange={handleClick}
            />
          );
          setOpen(true);
        }}
      />
    </div>
  );
};

export default Device;
