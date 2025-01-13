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
import DeviceEnable from "./DeviceEnable";
import DeviceSensorMode from "./DeviceSensorMode";
import DeviceState from "./DeviceState";

const DeviceDetails = ({ deviceName }) => {
  const { devices } = useData();

  const [device, setDevice] = useState(null);

  useEffect(() => {
    if (devices) {
      const device = devices.find((device) => device.name === deviceName);
      setDevice(device);
    }
  }, [devices, deviceName]);

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
        <DeviceEnable device={device} />
        <DeviceSensorMode device={device} />
        <DeviceState device={device} />
      </div>
      <Separator />
      <Button text="Edit" icon={faEdit} />
    </div>
  );
};

export default DeviceDetails;
