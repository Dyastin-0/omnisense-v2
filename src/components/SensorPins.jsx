import { GPIO_PINS } from "../helpers/constants";
import useData from "../hooks/useData";
import Checkbox from "./ui/Checkbox";

const SensorPins = ({ setSelectedSensorPin, selectedSensorPin, device }) => {
  const { devices } = useData();

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
            setSelectedSensorPin(pin);
          }}
        />
      ))}
    </div>
  );
};

export default SensorPins;
