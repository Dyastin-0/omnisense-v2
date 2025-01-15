import GenericModal from "./GenericModal";
import DeviceDetails from "../DeviceDetails";

const DeviceModal = ({ deviceName, deviceId }) => {
  return (
    <GenericModal
      className="h-fit text-xs text-primary-foreground"
      title={deviceName}
    >
      <DeviceDetails deviceName={deviceName} deviceId={deviceId} />
    </GenericModal>
  );
};

export default DeviceModal;
