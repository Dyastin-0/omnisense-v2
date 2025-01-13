import { useEffect, useState } from "react";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Toggle from "./Toggle";
import Button from "./ui/Button";
import Separator from "./ui/Separator";
import useToast from "./hooks/useToast";
import useData from "../hooks/useData";
import {
  setDeviceState,
  setSensorMode,
  setToggleState,
} from "../helpers/data-helper";
import useAuth from "../hooks/useAuth";

const DeviceDetails = ({ deviceName }) => {
  const { toastInfo } = useToast();
  const { user } = useAuth();
  const { devices } = useData();
  const { userDataPath } = useAuth();

  const [device, setDevice] = useState(null);

  useEffect(() => {
    if (devices) {
      const device = devices.find((device) => device.name === deviceName);
      setDevice(device);
    }
  }, [devices, deviceName]);

  const handleClick = (newState, enabled, sensorMode) => {
    if (!enabled) {
      toastInfo(`${device.name} is disabled.`);
      return;
    }

    if (sensorMode) {
      toastInfo(`${device.name} is in sensor mode. It cannot be toggled.`);
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

  const handleDeviceStateChange = (newState, sensorMode) => {
    if (device.state) {
      toastInfo(`${deviceName} is on, turn it off first.`);
      return;
    }

    if (sensorMode) {
      toastInfo(`${deviceName} is in sensor mode, turn it off first.`);
      return;
    }

    const action = newState ? "enabled" : "disabled";

    setDeviceState(userDataPath, device.name, newState);
    toastInfo(`${deviceName} ${action}.`);
  };

  const handleSensorModeChange = (newState, enabled, sensor) => {
    if (!enabled) {
      toastInfo(`${deviceName} is disabled.`);
      return;
    }

    if (!sensor) {
      toastInfo(`${deviceName} has no sensor.`);
      return;
    }

    setSensorMode(userDataPath, device.name, newState);

    const action = newState ? "enabled" : "disabled";
    toastInfo(`${deviceName} sensor mode ${action}.`);
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-secondary-foreground">Name</h1>
      <span>{device?.name}</span>
      <h1 className="text-secondary-foreground">State</h1>
      <span>{device?.state ? "On" : "Off"}</span>
      <h1 className="text-secondary-foreground">Enabled</h1>
      <span>{device?.enabled ? "True" : "False"}</span>
      <h1 className="text-secondary-foreground">Sensor</h1>
      <span>{device?.sensor?.name ? device?.sensor.name : "None"}</span>
      <Separator />
      <div className="flex gap-2">
        <div className="flex flex-col items-center gap-2">
          <Toggle
            value={device?.enabled}
            onClick={() =>
              handleDeviceStateChange(!device.enabled, device.sensorMode)
            }
          />
          <h1 className="text-secondary-foreground">Enable</h1>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Toggle
            value={device?.sensorMode}
            onClick={() =>
              handleSensorModeChange(
                !device.sensorMode,
                device.enabled,
                device.sensor
              )
            }
          />
          <h1 className="text-secondary-foreground">Sensor mode</h1>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Toggle
            value={device?.state}
            onClick={() =>
              handleClick(!device.state, device.enabled, device.sensorMode)
            }
          />
          <h1 className="text-secondary-foreground">State</h1>
        </div>
      </div>
      <Separator />
      <Button text="Edit" icon={faEdit} />
    </div>
  );
};

export default DeviceDetails;
