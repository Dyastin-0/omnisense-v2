import { useState } from "react";
import useData from "../../hooks/useData"
import useSettings from "../../hooks/useSettings";
import useToast from "../hooks/useToast";
import Checkbox from "../ui/Checkbox";
import GenericModal from "./GenericModal";
import Separator from "../ui/Separator";
import NormalInput from "../ui/NormalInput";
import Button from "../ui/Button";
import { addInstance } from "../../helpers/data-helper";
import useAuth from "../../hooks/useAuth";

const SelectInstanceModal = () => {
  const { instances } = useData();
  const { user } = useAuth()
  const { selectedInstance, setSelectedInstance } = useSettings();
  const { toastInfo } = useToast();
  const [newInstance, setNewInstance] = useState("");

  const createNewInstance = async () => {
    if (instances.includes(newInstance)) {
      toastInfo("Instance already " + newInstance + " exists.");
      return;
    }

    await addInstance(user.uid, newInstance);
    toastInfo("New instance created.");
  }

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
        <h1 className="text-secondary-foreground">Create</h1>
        <NormalInput
          placeholder="New instance"
          value={newInstance}
          onChange={(e) => setNewInstance(e.target.value)}
        />
        <Button text="Create new instance" onClick={createNewInstance} />
      </div>

    </GenericModal>
  )
}

export default SelectInstanceModal
