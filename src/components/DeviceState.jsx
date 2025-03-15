import { setToggleState } from "../helpers/data-helper";
import useAuth from "../hooks/useAuth";
import useToast from "./hooks/useToast";
import Toggle from "./Toggle";

const DeviceState = ({ deviceId, device }) => {
  const { user, userDataPath } = useAuth();
  const { toastInfo } = useToast();

  const handleDeviceStateToggle = (newState, enabled, sensorMode, scheduleMode) => {
    if (!enabled) {
      toastInfo(`${device.name} is disabled.`);
      return;
    }

    if (sensorMode) {
      toastInfo(`${device.name} is in sensor mode. It cannot be toggled.`);
      return;
    }

    if (scheduleMode) {
      toastInfo(`${device.name} is in schedule mode. It cannot be toggled.`);
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
    setToggleState(userDataPath, deviceId, newState, message);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Toggle
        value={device?.state}
        onClick={() =>
          handleDeviceStateToggle(
            !device.state,
            device.enabled,
            device.sensorMode,
            device.scheduleMode
          )
        }
      />
      <h1 className="text-secondary-foreground">State</h1>
    </div>
  );
};

export default DeviceState;
