import { GPIO_PINS } from "../helpers/constants";
import useData from "../hooks/useData";
import useToast from "./hooks/useToast";
import Checkbox from "./ui/Checkbox";

const SensorPins = ({
  setSelectedSensorPin,
  selectedSensorPin,
  selectedSensor,
  device,
}) => {
  const { devices } = useData();
  const { toastInfo } = useToast();

  return (
    <div className="flex gap-2 flex-wrap">
      {GPIO_PINS.filter(
        (pin) =>
          !devices.some((d) => d.sensor?.pin == pin && d.name != device?.name)
      ).map((pin) => (
        <Checkbox
          key={pin}
          name={pin}
          value={
            selectedSensorPin || selectedSensorPin == 0
              ? selectedSensorPin == pin
              : device?.sensor?.pin == pin
          }
          onChecked={(e) => {
            e.preventDefault();
            if (!selectedSensor) {
              toastInfo("Select a sensor first.");
              return;
            }
            setSelectedSensorPin(selectedSensorPin == pin ? null : pin);
          }}
        />
      ))}
    </div>
  );
};

export default SensorPins;
