import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import useData from '../hooks/useData';
import _ from 'lodash';
import { COLORS } from '../helpers/constants';
import CustomTooltip from './CustomTooltip';

export const UptimePieChart = () => {
  const { monthsUptime, currentMonth } = useData();
  const [uptimePieData, setUptimePieData] = useState([]);

  useEffect(() => {
    if (monthsUptime?.length > 0 && currentMonth) {
      const currentMonthUptime = monthsUptime.find((month) => month.month === currentMonth);

      if (currentMonthUptime?.data?.length > 0) {
        const deviceUptimes = {};

        currentMonthUptime.data.forEach(dataPoint => {
          Object.keys(dataPoint).forEach(key => {
            if (key !== 'date' && key !== 'total') {
              deviceUptimes[key] = (deviceUptimes[key] || 0) + (dataPoint[key] || 0);
            }
          });
        });

        const pieData = Object.entries(deviceUptimes)
          .filter(([name, value]) => value > 0)
          .map(([name, value]) => ({
            name,
            value,
            date: currentMonth
          }));

        setUptimePieData(pieData);
      }
    }
  }, [monthsUptime, currentMonth]);

  return (
    <div className="col-span-2 bg-primary rounded-md p-4 text-primary-foreground">
      <h3 className="text-md text-center font-bold mb-4">Uptime Distribution - {currentMonth}</h3>
      <div className="text-xs w-full h-64">
        {uptimePieData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={uptimePieData}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={100}
                innerRadius={60}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(2)}%`}
              >
                {uptimePieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
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

export default UptimePieChart;
