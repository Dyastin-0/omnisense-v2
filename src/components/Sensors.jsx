import { sensors } from "../helpers/constants";
import Checkbox from "./ui/Checkbox";

const Sensors = ({ selectedSensor, setSelectedSensor, device }) => {
  return (
    <div className="flex gap-2">
      {sensors.map((sensor) => (
        <Checkbox
          key={sensor}
          name={sensor}
          value={
            selectedSensor
              ? selectedSensor == sensor
              : device?.sensor?.name == sensor
          }
          onChecked={(e) => {
            e.preventDefault();
            setSelectedSensor(sensor);
          }}
        />
      ))}
    </div>
  );
};

export default Sensors;
