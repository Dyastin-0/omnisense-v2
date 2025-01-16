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
  const [formData, setFormData] = useState({
    name: "",
    powerRating: "",
    selectedSensor: null,
    selectedRelayPin: null,
    selectedSensorPin: null,
  });

  useEffect(() => {
    if (device) {
      setFormData({
        name: device.name || "",
        powerRating: device.powerRating || "",
        selectedSensor: device.sensor?.name || null,
        selectedRelayPin: device.pin || null,
        selectedSensorPin: device.sensor?.pin || null,
      });
    }
  }, [device]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, selectedRelayPin, selectedSensor, selectedSensorPin } =
      formData;

    if (selectedSensor && !(selectedSensorPin || selectedSensorPin == 0)) {
      toastInfo("Select a sensor pin.");
      return;
    }

    if (isNaN(formData.powerRating)) {
      toastInfo("Power rating must be a number.");
      return;
    }

    if (formData.powerRating < 0) {
      toastInfo("Power rating must be a positive number.");
      return;
    }

    await updateDevice(userDataPath, deviceId, {
      pin: selectedRelayPin,
      name,
      powerRating: parseInt(formData.powerRating),
      sensor: { name: selectedSensor, pin: selectedSensorPin },
    });

    if (name !== deviceName) {
      setDeviceName(name);
    }

    toastInfo("Device updated successfully.");
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <GenericModal title={`Edit ${deviceName}`} className="h-fit">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <h1 className="text-xs text-secondary-foreground">Details</h1>
        <div className="flex flex-col gap-2">
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
            device={device}
          />
        </div>
        <Separator />
        <h1 className="text-xs text-secondary-foreground">Sensor</h1>
        <Sensors
          selectedSensor={formData.selectedSensor}
          setSelectedSensor={(sensor) => handleChange("selectedSensor", sensor)}
          setSelectedSensorPin={(pin) => handleChange("selectedSensorPin", pin)}
          device={device}
        />
        <h1 className="text-xs text-secondary-foreground">Sensor Pin</h1>
        <SensorPins
          selectedSensorPin={formData.selectedSensorPin}
          selectedSensor={formData.selectedSensor}
          setSelectedSensorPin={(pin) => handleChange("selectedSensorPin", pin)}
          device={device}
        />
        <Separator />
        <Button type="submit" text="Save" />
      </form>
    </GenericModal>
  );
};

export default EditDeviceModal;
