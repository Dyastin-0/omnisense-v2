import { useState, useEffect } from "react";
import useDevice from "../../hooks/useDevice";
import Button from "../ui/Button";
import NormalInput from "../ui/NormalInput";
import Separator from "../ui/Separator";
import GenericModal from "./GenericModal";
import RelayPins from "../RelayPins";
import SensorPins from "../SensorPins";
import Sensors from "../Sensors";
import useAuth from "../../hooks/useAuth";
import { updateDevice } from "../../helpers/data-helper";
import useToast from "../hooks/useToast";

const EditDeviceModal = ({ deviceName: initialDeviceName, deviceId }) => {
  const { toastInfo } = useToast();
  const { userDataPath } = useAuth();
  const [deviceName, setDeviceName] = useState(initialDeviceName);
  const device = useDevice({ deviceName });
  const [localDevice, setLocalDevice] = useState(device);
  const [name, setName] = useState("");
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [selectedRelayPin, setSelectedRelayPin] = useState(null);
  const [powerRating, setPowerRating] = useState("");
  const [selectedSensorPin, setSelectedSensorPin] = useState(null);

  useEffect(() => {
    if (device) {
      setLocalDevice(device);
      setName(device.name || "");
      setSelectedSensor(device.sensor?.name || null);
      setSelectedRelayPin(device.pin || null);
      setPowerRating(device.powerRating || "");
      setSelectedSensorPin(device.sensor?.pin || null);
    }
  }, [device]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateDevice(userDataPath, deviceId, {
      pin: selectedRelayPin,
      name: name,
      sensor: {
        name: selectedSensor,
        pin: selectedSensorPin,
      },
    });

    if (name !== deviceName) {
      setDeviceName(name);
    }

    toastInfo("Device updated successfully.");
  };

  return (
    <GenericModal title={`Edit ${deviceName}`} className="h-fit">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <h1 className="text-xs text-secondary-foreground">Details</h1>
        <div className="flex flex-col gap-2">
          <NormalInput
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <NormalInput
            placeholder="Power rating"
            value={powerRating}
            onChange={(e) => setPowerRating(e.currentTarget.value)}
          />
          <h1 className="text-xs text-secondary-foreground">Relay pin</h1>
          <RelayPins
            selectedRelayPin={selectedRelayPin}
            setSelectedRelayPin={setSelectedRelayPin}
            device={localDevice}
          />
        </div>
        {localDevice?.sensor && (
          <>
            <Separator />
            <h1 className="text-xs text-secondary-foreground">Sensor</h1>
            <Sensors
              selectedSensor={selectedSensor}
              setSelectedSensor={setSelectedSensor}
              device={localDevice}
            />
            <h1 className="text-xs text-secondary-foreground">Sensor pin</h1>
            <SensorPins
              selectedSensorPin={selectedSensorPin}
              setSelectedSensorPin={setSelectedSensorPin}
              device={localDevice}
            />
          </>
        )}
        <Separator />
        <Button type="submit" text="Save" />
      </form>
    </GenericModal>
  );
};

export default EditDeviceModal;
