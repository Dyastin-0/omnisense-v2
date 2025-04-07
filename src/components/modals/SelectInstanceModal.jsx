import useData from "../../hooks/useData"
import useSettings from "../../hooks/useSettings";
import useToast from "../hooks/useToast";
import Checkbox from "../ui/Checkbox";
import GenericModal from "./GenericModal";
import Separator from "../ui/Separator";
import NormalInput from "../ui/NormalInput";
import { useState } from "react";

const SelectInstanceModal = () => {
  const { instances } = useData();
  const { selectedInstance, setSelectedInstance } = useSettings();
  const { toastInfo } = useToast();
  const [newInstance, setNewInstance] = useState("");

  return (
    <GenericModal title="Instance" className="h-fit">
      <div className="flex flex-col gap-2">
        <h1 className="text-secondary-foreground">Select</h1>
        {instances.map((i) => (
          <Checkbox
            key={i}
            name={i}
            value={i === selectedInstance}
            onChecked={() => {
              if (i === selectedInstance) {
                toastInfo(`You are already in ${i} instance.`);
                return;
              }
              setSelectedInstance(i);
            }}
          />
        ))}
        <Separator />
        <h1 className="text-secondary-foreground">Add</h1>
        <NormalInput
          placeholder="New instance"
          value={newInstance}
          onChange={(e) => setNewInstance(e.target.value)}
        />
      </div>
    </GenericModal>
  )
}

export default SelectInstanceModal
