import { createContext, useContext, useEffect, useState } from "react";

const SettingsContext = createContext();

const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const [areDevicesIncluded, setAreDevicesIncluded] = useState(true);
  const [areInactiveDaysIncluded, setAreInactiveDaysIncluded] = useState(true);
  const [selectedInstance, setSelectedInstance] = useState("Default");

  const toggleIncludeDevice = () => {
    const current = !areDevicesIncluded;
    setAreDevicesIncluded(current);
    localStorage.setItem("areDevicesIncluded", current);
  };

  const toggleIncludeInactiveDays = () => {
    const current = !areInactiveDaysIncluded;
    setAreInactiveDaysIncluded(current);
    localStorage.setItem("areInactiveDaysIncluded", current);
  };

  useEffect(() => {
    const deviceIncluded = localStorage.getItem("areDevicesIncluded");
    const inactiveDaysIncluded = localStorage.getItem(
      "areInactiveDaysIncluded"
    );
    const selectedInstance = localStorage.getItem("selectedInstance");

    if (selectedInstance !== null) {
      setSelectedInstance(selectedInstance);
    }

    if (deviceIncluded !== null) {
      setAreDevicesIncluded(deviceIncluded === "true");
    }
    if (inactiveDaysIncluded !== null) {
      setAreInactiveDaysIncluded(inactiveDaysIncluded === "true");
    }
  }, []);

  const value = {
    areDevicesIncluded,
    toggleIncludeDevice,
    areInactiveDaysIncluded,
    toggleIncludeInactiveDays,
    selectedInstance,
    setSelectedInstance,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export default useSettings;
