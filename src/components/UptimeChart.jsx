import React, { useEffect, useState, useRef } from "react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import useData from "../hooks/useData";
import useSettings from "../hooks/useSettings";
import CustomTooltip from "./CustomTooltip";

export const UptimeChart = () => {
  const { devices, messages, monthsUptime, currentMonth } = useData();
  const { areDevicesIncluded } = useSettings();
  const [renderedAreas, setRenderedAreas] = useState([]);
  const [uptime, setUptime] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (monthsUptime?.length > 0 && currentMonth) {
      const uptime = monthsUptime.find((month) => month.month === currentMonth);
      setUptime(uptime?.data || []);
      console.log(uptime)
    }
  }, [monthsUptime, currentMonth]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (uptime.length > 0 && devices) {
      intervalRef.current = setInterval(() => {
        setUptime(prevUptime => {
          const newUptime = [...prevUptime];

          if (newUptime.length > 0) {
            const lastIndex = newUptime.length - 1;
            const lastItem = { ...newUptime[lastIndex] };
            let totalIncrement = 0;

            Object.entries(devices).forEach(([deviceId, deviceInfo]) => {
              const deviceName = deviceInfo.name;

              if (deviceInfo.state) {
                if (typeof lastItem[deviceName] === 'number') {
                  const increment = 0.0003;
                  lastItem[deviceName] = lastItem[deviceName] + increment;
                  totalIncrement += increment;
                }
              }
            });

            if (typeof lastItem.total === 'number') {
              lastItem.total = lastItem.total + totalIncrement;
            }

            newUptime[lastIndex] = lastItem;
          }

          return newUptime;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [uptime.length, devices]);

  useEffect(() => {
    const renderAreas = () => {
      const rendered = Object.entries(devices).map(([key, value], index) => {
        return (
          <Area
            key={index}
            type="monotone"
            dataKey={value.name}
            stroke="var(--highlight)"
            fill="var(--highlight)"
          />
        );
      });
      setRenderedAreas(rendered);
    };
    messages && devices && renderAreas();
  }, [messages, devices]);

  return (
    <div className=" col-span-2 bg-primary rounded-md p-4 text-primary-foreground">
      <h3 className="text-md text-center font-bold mb-4">Usage</h3>
      <div className="text-xs w-full h-64">
        {uptime?.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width="100%"
              height="100%"
              data={uptime}
              margin={{ right: 30 }}
              isAnimationActive={true}
              animationDuration={500}
            >
              <YAxis
                tickFormatter={(value) => {
                  if (value >= 1) {
                    return `${value} h`;
                  } else if (value < 0.006) {
                    return `${(value * 3600).toFixed(2)} s`;
                  } else {
                    return `${(value * 60).toFixed(2)} m`;
                  }
                }}
              />
              <XAxis dataKey="date" />
              <CartesianGrid />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="total"
                stroke="var(--highlight)"
                fill="var(--highlight)"
                fillOpacity={0.6}
                isAnimationActive={true}
              />
              {areDevicesIncluded &&
                renderedAreas.length > 0 &&
                renderedAreas.map((area, index) => (
                  <React.Fragment key={index}>{area}</React.Fragment>
                ))}
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full">
            <h1 className="text-lg font-medium text-gray-500">No data to display.</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default UptimeChart;
