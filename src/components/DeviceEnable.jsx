import { setDeviceState } from "../helpers/data-helper";
import useAuth from "../hooks/useAuth";
import useToast from "./hooks/useToast";
import Toggle from "./Toggle";

const DeviceEnable = ({ device }) => {
  const { userDataPath } = useAuth();
  const { toastInfo } = useToast();

  const handleEnableToggle = (newState, sensorMode) => {
    if (device.state) {
      toastInfo(`${device.name} is on, turn it off first.`);
      return;
    }

    if (sensorMode) {
      toastInfo(`${device.name} is in sensor mode, turn it off first.`);
      return;
    }

    setDeviceState(userDataPath, device.name, newState);

    const action = newState ? "enabled" : "disabled";
    toastInfo(`${device.name} ${action}.`);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Toggle
        value={device?.enabled}
        onClick={() => handleEnableToggle(!device.enabled, device.sensorMode)}
      />
      <h1 className="text-secondary-foreground">Enable</h1>
    </div>
  );
};

export default DeviceEnable;
