import { useState } from "react";
import { Days } from "./Days";
import TimePicker from "./TimePicker";
import Button from "./ui/Button";
import Separator from "./ui/Separator";
import useToast from "./hooks/useToast";
import { updateDevice } from "../helpers/data-helper";
import useAuth from "../hooks/useAuth";
import { parseTimeString } from "../helpers/regex"

export const ScheduleDevice = ({ initialSchedule, deviceName, deviceId }) => {
  const { toastInfo } = useToast();
  const { userDataPath } = useAuth();

  const [selectedDays, setSelectedDays] = useState(initialSchedule?.days || []);
  const [selectedFromTime, setSelectedFromTime] = useState(parseTimeString(initialSchedule?.from) || { hours: 7, minutes: 30, period: "AM" });
  const [selectedToTime, setSelectedToTime] = useState(parseTimeString(initialSchedule?.to) || { hours: 5, minutes: 30, period: "PM" });

  const handleSetSchedule = async (e) => {
    e.preventDefault();

    if (selectedDays.length < 1) {
      toastInfo("No selected day");
      return;
    }

    await updateDevice(userDataPath, deviceId, {
      schedule: {
        days: selectedDays,
        from: `${selectedFromTime.hours}:${selectedFromTime.minutes} ${selectedFromTime.period}`,
        to: `${selectedToTime.hours}:${selectedToTime.minutes} ${selectedToTime.period}`
      }
    });

    toastInfo('Schedule set succesfully!');
  }

  return (
    <div className="w-full flex flex-col gap-2">
      <h1 className="text-secondary-foreground">Days</h1>
      <Days selectedDays={selectedDays} setSelectedDays={(e) => setSelectedDays(e)} />
      <Separator />
      <div className="flex gap-2">
        <h1 className="text-secondary-foreground">From</h1>
        <TimePicker selectedTime={selectedFromTime} onChange={(e) => setSelectedFromTime(e)} />
        <h1 className="text-secondary-foreground">To</h1>
        <TimePicker selectedTime={selectedToTime} onChange={(e) => setSelectedToTime(e)} />
      </div>
      <Separator />
      <Button onClick={handleSetSchedule} text="Set schedule" type="submit" />
    </div>
  )
}


