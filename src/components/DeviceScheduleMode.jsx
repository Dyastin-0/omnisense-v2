
import { setScheduleMode } from "../helpers/data-helper";
import useAuth from "../hooks/useAuth";
import useToast from "./hooks/useToast";
import Toggle from "./Toggle";

const DeviceSensorMode = ({ deviceId, device }) => {
  const { userDataPath } = useAuth();
  const { toastInfo } = useToast();

  const handleSensorModeToggle = (newState, enabled, schedule, sensorMode) => {
    if (!enabled) {
      toastInfo(`${device.name} is disabled.`);
      return;
    }

    if (!schedule) {
      toastInfo(`${device.name} has no schedule.`);
      return;
    }

    if (sensorMode) {
      toastInfo("Device can't be in schedule and sensor mode at the same time.");
      return;
    }

    setScheduleMode(userDataPath, deviceId, newState);

    const action = newState ? "enabled" : "disabled";
    toastInfo(`${device.name} schedule mode ${action}.`);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Toggle
        value={device?.scheduleMode}
        onClick={() =>
          handleSensorModeToggle(
            !device.scheduleMode,
            device.enabled,
            device.schedule,
            device.sensorMode
          )
        }
      />
      <h1 className="text-secondary-foreground">Schedule mode</h1>
    </div>
  );
};

export default DeviceSensorMode;
