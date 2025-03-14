import { DAYS } from "../helpers/constants"
import Checkbox from "./ui/Checkbox"

export const Days = ({ selectedDays, setSelectedDays }) => {

  return (
    <div className="flex flex-wrap gap-2">
      {DAYS.map((day) => (
        <Checkbox key={day}
          name={day}
          value={selectedDays.some((d) => d === day)}
          onChecked={() => {
            const newSelectedDays = selectedDays.some((d) => d === day) ?
              selectedDays.filter((d) => d !== day) : [...selectedDays, day];
            setSelectedDays(newSelectedDays);
          }}
        />
      ))}
    </div>
  )
}

