import { setDeviceState } from "../helpers/data-helper";
import useAuth from "../hooks/useAuth";
import useToast from "./hooks/useToast";
import Toggle from "./Toggle";

const DeviceEnable = ({ deviceId, device }) => {
  const { userDataPath } = useAuth();
  const { toastInfo } = useToast();

  const handleEnableToggle = (newState, sensorMode, scheduleMode) => {
    if (device.state) {
      toastInfo(`${device.name} is on, disable it first.`);
      return;
    }

    if (sensorMode) {
      toastInfo(`${device.name} is in sensor mode, disable it first.`);
      return;
    }

    if (scheduleMode) {
      toastInfo(`${device.name} is in schedule mode, disable it first.`);
    }

    setDeviceState(userDataPath, deviceId, newState);

    const action = newState ? "enabled" : "disabled";
    toastInfo(`${device.name} ${action}.`);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Toggle
        value={device?.enabled}
        onClick={() => handleEnableToggle(!device.enabled, device.sensorMode, device.sensorMode)}
      />
      <h1 className="text-secondary-foreground">Enable</h1>
    </div>
  );
};

export default DeviceEnable;
