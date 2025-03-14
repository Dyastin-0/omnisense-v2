import { ScheduleDevice } from "../ScheduleDevice"
import GenericModal from "./GenericModal"

export const ScheduleDeviceModal = ({ initialSchedule, deviceName, deviceId }) => {
  return (
    <GenericModal title={`Set schedule for ${deviceName}`} className="h-fit">
      <ScheduleDevice initialSchedule={initialSchedule} deviceName={deviceName} deviceId={deviceId} />
    </GenericModal>
  )
}
