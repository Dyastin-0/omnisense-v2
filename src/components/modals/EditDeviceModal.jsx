import { useState } from "react";
import { sensors } from "../../helpers/constants";
import useDevice from "../../hooks/useDevice";
import Button from "../ui/Button";
import Checkbox from "../ui/Checkbox";
import NormalInput from "../ui/NormalInput";
import Separator from "../ui/Separator";
import GenericModal from "./GenericModal";

const EditDeviceModal = ({ deviceName }) => {
  const device = useDevice({ deviceName });
  const [selectedSensor, setSelectedSensor] = useState(null);

  return (
    <GenericModal title={`Edit ${deviceName}`} className="h-fit">
      <div className="flex flex-col gap-2">
        <h1 className="text-xs text-secondary-foreground">Details</h1>
        <div className="flex flex-col gap-2">
          <NormalInput placeholder="Name" />
          <NormalInput placeholder="Pin" />
          <NormalInput placeholder="Power rating" />
        </div>
        <Separator />
        <h1 className="text-xs text-secondary-foreground">Sensor</h1>
        <div className="flex gap-2">
          {sensors.map((sensor) => (
            <Checkbox
              key={sensor.name}
              name={sensor.name}
              value={selectedSensor?.name === sensor.name}
              onChecked={() => {
                setSelectedSensor(sensor);
              }}
            />
          ))}
        </div>
        <Separator />
        <Button text="Save" />
      </div>
    </GenericModal>
  );
};

export default EditDeviceModal;
