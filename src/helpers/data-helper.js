import { pushInArray, updateData } from "../config/database";

export const setDeviceState = (userDataPath, id, enabled) => {
  updateData(`/${userDataPath}/devices/${id}`, { enabled: enabled });
};

export const setToggleState = (userDataPath, id, state, message) => {
  updateData(`/${userDataPath}/devices/${id}`, { state: state });
  updateData(`/${userDataPath}/messages`, { [message.timeSent]: message });
};

export const setSensorMode = (userDataPath, id, state) => {
  updateData(`/${userDataPath}/devices/${id}`, { sensorMode: state });
};

export const setScheduleMode = (userDataPath, id, state) => {
  updateData(`/${userDataPath}/devices/${id}`, { scheduleMode: state });
};

export const setDeviceName = async (userDataPath, id, newName) => {
  updateData(`/${userDataPath}/devices/${id}`, { name: newName });
};

export const setPowerRating = async (userDataPath, id, newPowerRating) => {
  updateData(`/${userDataPath}/devices/${id}`, { powerRating: newPowerRating });
};

export const setDevicePin = async (userDataPath, id, newPin) => {
  updateData(`/${userDataPath}/devices/${id}`, { pin: newPin });
};

export const setDeviceSensor = async (userDataPath, id, sensor) => {
  updateData(`/${userDataPath}/devices/${id}`, { sensor: sensor });
};

export const addDevice = async (
  userDataPath,
  deviceName,
  powerRating,
  devicePin,
) => {
  await pushInArray(`/${userDataPath}/devices`, {
    name: deviceName,
    pin: devicePin,
    powerRating: powerRating,
    enabled: false,
    state: 0,
  });
};

export const addInstance = async (userPath, newInstance) => {
  updateData(`/${userPath}/${newInstance}`, {
    devices: {
      "sample-device": {
        name: "Sample Device",
        pin: 26,
        powerRating: 12,
      },
    },
  });
};

export const cacheComputedData = (userPath, data) => {
  updateData(`${userPath}/cachedComputedData`, data);
};

export const cacheComputedUptime = async (userPath, data) => {
  updateData(`${userPath}/cachedComputedUptime`, data);
};

export const updateDevice = async (userDataPath, deviceId, data) => {
  updateData(`${userDataPath}/devices/${deviceId}`, data);
};
