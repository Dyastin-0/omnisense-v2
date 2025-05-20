import React, { createContext, useContext, useEffect, useState } from "react";

import { onValue, ref, get } from "firebase/database";

import { db } from "../config/firebase";
import useAuth from "./useAuth";
import {
  calculateConsumptionAndCost,
  calculateDevicesUptime,
  divideDataByMonth,
} from "../helpers/chart-helper";
import useSettings from "./useSettings";

const DataContext = createContext();

const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const { areInactiveDaysIncluded } = useSettings();

  const { user, userDataPath } = useAuth();
  const [isFetching, setIsFetching] = useState(true);
  const [devices, setDevices] = useState(null);
  const [messages, setMessages] = useState(null);
  const [monthsUptime, setMonthsUptime] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(null);
  const [instances, setInstances] = useState(["Default"]);
  const [microcontroller, setMicrocontroller] = useState(null);
  const [cachedUptimeData, setCachedUptimeData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const instancesRef = ref(db, `/${user.uid}`);
      onValue(instancesRef, (snapshot) => {
        setInstances(
          Object.keys(snapshot.val()).filter((val) => val !== "instances") || []
        );
      });

      const instanceRef = ref(db, `/${userDataPath}`);
      onValue(instanceRef, (snapshot) => {
        setMicrocontroller(snapshot.val()?.microcontroller);
      });

      const devicesRef = ref(db, `/${userDataPath}/devices`);

      onValue(devicesRef, (snapshot) => {
        const devices = Object.entries(snapshot.val() || {}).map(
          ([key, value]) => ({
            id: key,
            ...value,
          })
        );
        setDevices(devices);
      });

      const messagesRef = ref(db, `/${userDataPath}/messages`);

      onValue(messagesRef, (snapshot) => {
        const messages = snapshot.val() || [];
        setMessages(messages);
      });

      onValue(messagesRef, (snapshot) => {
        const messages = Object.values(snapshot.val() || {});
        setMessages(messages);
      });

      const uptimeDataRef = ref(db, `/${userDataPath}/cachedComputedUptime`);

      get(uptimeDataRef).then((snapshot) => {
        setCachedUptimeData(snapshot.val() || {});
      });

    };
    user && fetchData();
  }, [user, userDataPath]);

  useEffect(() => {
    setIsFetching(!(devices !== null) && messages !== null);
  }, [devices, messages]);

  useEffect(() => {
    if (messages && cachedUptimeData) {
      const date = new Date();
      const month = date.toLocaleString("default", { month: "long" });
      const year = date.getFullYear();
      const key = `${month} ${year}`;

      setCurrentMonth(key);

      const months = divideDataByMonth(messages);

      const data = Object.entries(months).map(([key, value]) => {
        return {
          month: key,
          data: calculateDevicesUptime(
            value,
            cachedUptimeData,
            areInactiveDaysIncluded,
            userDataPath
          ),
        };
      });

      setMonthsUptime(data);

    }
  }, [messages, cachedUptimeData, areInactiveDaysIncluded]);

  const value = {
    isFetching,
    devices,
    messages,
    monthsUptime,
    currentMonth,
    instances,
    microcontroller,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default useData;
