import useData from "../hooks/useData";
import Device from "./Device";

const Devices = () => {
  const { devices } = useData();

  return (
    <div className="flex flex-col w-full h-[calc(250px+1rem)] bg-primary rounded-md">
      <h1 className="text-md text-center pt-2 text-primary-foreground font-semibold">
        Devices
      </h1>
      <div className="flex flex-col gap-2 p-2 overflow-y-auto scrollbar-thin scrollbar-thumb-primary-highlight">
        {devices &&
          devices.map((device, index) => (
            <Device key={index} device={device} />
          ))}
      </div>
    </div>
  );
};

export default Devices;
