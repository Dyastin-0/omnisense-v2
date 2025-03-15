import { faClock, faEdit } from "@fortawesome/free-solid-svg-icons";
import Button from "./ui/Button";
import Separator from "./ui/Separator";
import DeviceEnable from "./DeviceEnable";
import DeviceSensorMode from "./DeviceSensorMode";
import DeviceState from "./DeviceState";
import DeviceScheduleMode from "./DeviceScheduleMode";
import DeviceDetail from "./DeviceDetail";
import useModal from "./hooks/useModal";
import EditDeviceModal from "./modals/EditDeviceModal";
import useDevice from "../hooks/useDevice";
import { ScheduleDeviceModal } from "./modals/ScheduleDeviceModal";

const DeviceDetails = ({ deviceName, deviceId }) => {
  const { setModal, setOpen } = useModal();
  const device = useDevice({ deviceName });

  return (
    <div className="flex flex-col gap-2">
      <DeviceDetail name="Name" value={device?.name} />
      <DeviceDetail name="State" value={device?.state ? "On" : "Off"} />
      <DeviceDetail name="Pin" value={device?.pin} />
      <DeviceDetail name="Power Rating" value={device?.powerRating} />
      {device?.sensor?.name && (
        <>
          <Separator />
          <DeviceDetail name="Sensor" value={device?.sensor?.name || "None"} />
          <DeviceDetail name="Sensor Pin" value={device?.sensor?.pin} />
          <DeviceDetail
            name={"Sensor Mode"}
            value={device?.sensorMode ? "On" : "Off"}
          />
        </>
      )}
      <Separator />
      <div className="flex gap-2">
        <DeviceEnable device={device} deviceId={deviceId} />
        {device?.sensor?.name && <DeviceSensorMode device={device} deviceId={deviceId} />}
        {device?.schedule && <DeviceScheduleMode device={device} deviceId={deviceId} />}
        <DeviceState device={device} deviceId={deviceId} />
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
        <Button text="Schedule" icon={faClock} className="flex-1"
          onClick={() => {
            setModal(
              <ScheduleDeviceModal initialSchedule={device?.schedule} deviceName={deviceName} deviceId={deviceId} />
            );
            setOpen(true);
          }}
        />
      </div>
    </div>
  );
};

export default DeviceDetails;
