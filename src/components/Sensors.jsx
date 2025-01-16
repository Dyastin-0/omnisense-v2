import { SENSORS } from "../helpers/constants";
import Checkbox from "./ui/Checkbox";

const Sensors = ({
  selectedSensor,
  setSelectedSensor,
  setSelectedSensorPin,
  device,
}) => {
  return (
    <div className="flex gap-2">
      {SENSORS.map((sensor) => (
        <Checkbox
          key={sensor}
          name={sensor}
          value={
            selectedSensor
              ? selectedSensor == sensor
              : device?.sensor?.name == sensor && !selectedSensor == sensor
          }
          onChecked={(e) => {
            e.preventDefault();
            const newsensor = selectedSensor == sensor ? null : sensor;
            setSelectedSensor(newsensor);
            if (!newsensor) {
              setSelectedSensorPin(null);
            }
          }}
        />
      ))}
    </div>
  );
};

export default Sensors;
