import GenericModal from "./GenericModal";
import DeviceDetails from "../DeviceDetails";

const DeviceModal = ({ deviceName, handleStateChange }) => {
  return (
    <GenericModal
      className="h-fit text-xs text-primary-foreground"
      title={deviceName}
    >
      <DeviceDetails
        deviceName={deviceName}
        handleStateChange={handleStateChange}
      />
    </GenericModal>
  );
};

export default DeviceModal;
