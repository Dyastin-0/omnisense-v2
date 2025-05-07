import React, { useEffect, useState } from "react";

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

export const UsageChart = () => {
  const { devices, messages, monthsUptime, currentMonth } = useData();
  const { areDevicesIncluded } = useSettings();
  const [renderedAreas, setRenderedAreas] = useState([]);
  const [uptime, setUptime] = useState([]);

  useEffect(() => {
    if (monthsUptime?.length > 0 && currentMonth) {
      const uptime = monthsUptime.find((month) => month.month === currentMonth);
      setUptime(uptime?.data || []);
    }
  }, [monthsUptime, currentMonth]);

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
    <div className="col-span-3 bg-[var(--bg-primary)] rounded-lg p-4">
      <h3 className="text-lg font-bold mb-4"> Usage </h3>
      <div className="w-full h-64">
        {uptime?.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width="100%"
              height="100%"
              data={uptime} e
              margin={{ right: 30 }}
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

export default UsageChart;
