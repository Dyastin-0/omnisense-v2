import { useState } from "react";
import useDevice from "../../hooks/useDevice";
import Button from "../ui/Button";
import NormalInput from "../ui/NormalInput";
import Separator from "../ui/Separator";
import GenericModal from "./GenericModal";
import RelayPins from "../RelayPins";
import SensorPins from "../SensorPins";
import Sensors from "../Sensors";

const EditDeviceModal = ({ deviceName }) => {
  const device = useDevice({ deviceName });
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [selectedRelayPin, setSelectedRelayPin] = useState(null);
  const [selectedSensorPin, setSelectedSensorPin] = useState(null);

  return (
    <GenericModal title={`Edit ${deviceName}`} className="h-fit">
      <form className="flex flex-col gap-2">
        <h1 className="text-xs text-secondary-foreground">Details</h1>
        <div className="flex flex-col gap-2">
          <NormalInput placeholder="Name" />
          <NormalInput placeholder="Power rating" />
          <h1 className="text-xs text-secondary-foreground">Relay pin</h1>
          <RelayPins
            selectedRelayPin={selectedRelayPin}
            setSelectedRelayPin={setSelectedRelayPin}
            device={device}
          />
        </div>
        <Separator />
        <h1 className="text-xs text-secondary-foreground">Sensor</h1>
        <Sensors
          selectedSensor={selectedSensor}
          setSelectedSensor={setSelectedSensor}
          device={device}
        />
        <h1 className="text-xs text-secondary-foreground">Sensor pin</h1>
        <SensorPins
          selectedSensorPin={selectedSensorPin}
          setSelectedSensorPin={setSelectedSensorPin}
          device={device}
        />
        <Separator />
        <Button type="submit" text="Save" />
      </form>
    </GenericModal>
  );
};

export default EditDeviceModal;
