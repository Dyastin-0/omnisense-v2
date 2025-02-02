import { GPIO_PINS } from "../helpers/constants";
import useData from "../hooks/useData";
import Checkbox from "./ui/Checkbox";

const RelayPins = ({ setSelectedRelayPin, selectedRelayPin, device }) => {
  const { devices } = useData();

  return (
    <div className="flex gap-2 flex-wrap">
      {GPIO_PINS.filter(
        (pin) => !devices.some((d) => d.pin == pin && d.name != device?.name)
      ).map((pin) => (
        <Checkbox
          key={pin}
          name={pin}
          value={
            selectedRelayPin || selectedRelayPin == 0
              ? selectedRelayPin == pin
              : device?.pin == pin
          }
          onChecked={(e) => {
            e.preventDefault();
            setSelectedRelayPin(selectedRelayPin == pin ? null : pin);
          }}
        />
      ))}
    </div>
  );
};

export default RelayPins;
