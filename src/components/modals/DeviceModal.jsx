import GenericModal from "./GenericModal";
import DeviceDetails from "../DeviceDetails";

const DeviceModal = ({ deviceName }) => {
  return (
    <GenericModal
      className="h-fit text-xs text-primary-foreground"
      title={deviceName}
    >
      <DeviceDetails deviceName={deviceName} />
    </GenericModal>
  );
};

export default DeviceModal;
