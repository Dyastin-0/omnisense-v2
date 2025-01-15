import { useEffect, useState } from "react";
import {
  faEdit,
  faSatelliteDish,
  faSignal,
} from "@fortawesome/free-solid-svg-icons";
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
import DeviceDetail from "./DeviceDetail";
import useModal from "./hooks/useModal";
import EditDeviceModal from "./modals/EditDeviceModal";
import useDevice from "../hooks/useDevice";

const DeviceDetails = ({ deviceName, deviceId }) => {
  const { setModal, setOpen } = useModal();
  const device = useDevice({ deviceName });

  return (
    <div className="flex flex-col gap-2">
      <DeviceDetail name="Name" value={device?.name} />
      <DeviceDetail name="State" value={device?.state ? "On" : "Off"} />
      <DeviceDetail name="Pin" value={device?.pin} />
      <DeviceDetail name="Sensor" value={device?.sensor?.name || "None"} />
      <DeviceDetail
        name={"Sensor Mode"}
        value={device?.sensorMode ? "On" : "Off"}
      />
      <Separator />
      <div className="flex gap-2">
        <DeviceEnable device={device} />
        <DeviceSensorMode device={device} />
        <DeviceState device={device} />
      </div>
      <Separator />
      <div className="flex gap-2">
        <Button
          text="Edit"
          icon={faEdit}
          className="flex-1"
          onClick={() => {
            setModal(
              <EditDeviceModal deviceName={deviceName} deviceId={deviceId} />
            );
            setOpen(true);
          }}
        />
        <Button text="Add Sensor" icon={faSatelliteDish} className="flex-1" />
      </div>
    </div>
  );
};

export default DeviceDetails;
