import { useEffect, useState } from "react";
import useData from "./useData";

const useDevice = ({ deviceName }) => {
  const { devices } = useData();

  const [device, setDevice] = useState(null);

  useEffect(() => {
    if (devices) {
      const device = devices.find((device) => device.name === deviceName);
      setDevice(device);
    }
  }, [devices, deviceName]);

  return device;
};

export default useDevice;
