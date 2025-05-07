const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="text-sm bg-[var(--bg-primary)] p-4 rounded-md">
        <h5 className="font-semibold mb-2">{label}</h5>
        {payload.map((load, key) => {
          const wholeHours = Math.floor(load.value);
          const remainingMinutes = Math.floor((load.value - wholeHours) * 60);
          const remainingSeconds = Math.floor(
            ((load.value - wholeHours) * 60 - remainingMinutes) * 60
          );
          return (
            <div className="flex justify-between items-center mb-1" key={key}>
              <p className="text-[var(--text-secondary)]">{load.name}</p>
              <h6 className="ml-4">{`${wholeHours} h ${remainingMinutes} m ${remainingSeconds} s`}</h6>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
