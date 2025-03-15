import { useState } from "react";
import RelayPins from "../RelayPins";
import NormalInput from "../ui/NormalInput";
import GenericModal from "./GenericModal";
import useData from "../../hooks/useData";
import Separator from "../ui/Separator";
import Sensors from "../Sensors";
import SensorPins from "../SensorPins";
import Button from "../ui/Button";
import useToast from "../hooks/useToast";
import { updateDevice } from "../../helpers/data-helper";
import useAuth from "../../hooks/useAuth";
import useModal from "../hooks/useModal";
import { hasSpecialCharacters } from "../../helpers/regex";

const AddDeviceModal = () => {
  const { userDataPath } = useAuth();
  const { devices } = useData();
  const { toastInfo } = useToast();
  const { setOpen } = useModal();

  const [formData, setFormData] = useState({
    name: "",
    powerRating: "",
    selectedSensor: null,
    selectedRelayPin: null,
    selectedSensorPin: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      name,
      powerRating,
      selectedRelayPin,
      selectedSensor,
      selectedSensorPin,
    } = formData;

    if (!name || !powerRating || !(selectedRelayPin || selectedRelayPin == 0)) {
      toastInfo("Missing required fields.");
      return;
    }

    if (isNaN(powerRating)) {
      toastInfo("Power rating must be a number.");
      return;
    }

    if (powerRating < 0) {
      toastInfo("Power rating must be a positive number.");
      return;
    }

    if (hasSpecialCharacters(name)) {
      toastInfo("Device name cannot contain special characters.");
      return;
    }

    if (devices.some((d) => d.name == name)) {
      toastInfo("Device name already used.");
      return;
    }

    if (selectedSensor && !(selectedSensorPin || selectedSensorPin == 0)) {
      toastInfo("Select a sensor pin.");
      return;
    }

    const deviceId = crypto.randomUUID();

    updateDevice(userDataPath, deviceId, {
      name,
      powerRating,
      pin: selectedRelayPin,
      state: false,
      enabled: false,
      sensorMode: false,
      scheduleMode: false,
      sensor: { name: selectedSensor, pin: selectedSensorPin },
    });

    toastInfo("Device added successfully.");
    setOpen(false);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <GenericModal title="Add device" className="h-fit">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <NormalInput
          placeholder="Name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.currentTarget.value)}
        />
        <NormalInput
          placeholder="Power rating"
          value={formData.powerRating}
          onChange={(e) => handleChange("powerRating", e.currentTarget.value)}
        />
        <h1 className="text-xs text-secondary-foreground">Relay Pin</h1>
        <RelayPins
          selectedRelayPin={formData.selectedRelayPin}
          setSelectedRelayPin={(pin) => handleChange("selectedRelayPin", pin)}
        />
        <Separator />
        <h1 className="text-xs text-secondary-foreground">Sensor</h1>
        <Sensors
          selectedSensor={formData.selectedSensor}
          setSelectedSensor={(sensor) => handleChange("selectedSensor", sensor)}
        />
        <h1 className="text-xs text-secondary-foreground">Sensor Pin</h1>
        <SensorPins
          selectedSensorPin={formData.selectedSensorPin}
          selectedSensor={formData.selectedSensor}
          setSelectedSensorPin={(pin) => handleChange("selectedSensorPin", pin)}
        />
        <Separator />
        <Button type="submit" text="Add" />
      </form>
    </GenericModal>
  );
};

export default AddDeviceModal;
