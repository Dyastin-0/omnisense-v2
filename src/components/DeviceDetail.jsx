const DeviceDetail = ({ name, value }) => {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-secondary-foreground">{name}</h1>
      <span>{value}</span>
    </div>
  );
};

export default DeviceDetail;
