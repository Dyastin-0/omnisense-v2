import { setSensorMode } from "../helpers/data-helper";
import useAuth from "../hooks/useAuth";
import useToast from "./hooks/useToast";
import Toggle from "./Toggle";

const DeviceSensorMode = ({ device }) => {
  const { userDataPath } = useAuth();
  const { toastInfo } = useToast();

  const handleSensorModeToggle = (newState, enabled, sensor) => {
    if (!enabled) {
      toastInfo(`${device.name} is disabled.`);
      return;
    }

    if (!sensor) {
      toastInfo(`${device.name} has no sensor.`);
      return;
    }

    setSensorMode(userDataPath, device.name, newState);

    const action = newState ? "enabled" : "disabled";
    toastInfo(`${device.name} sensor mode ${action}.`);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Toggle
        value={device?.sensorMode}
        onClick={() =>
          handleSensorModeToggle(
            !device.sensorMode,
            device.enabled,
            device.sensor
          )
        }
      />
      <h1 className="text-secondary-foreground">Sensor mode</h1>
    </div>
  );
};

export default DeviceSensorMode;
