import useData from "../hooks/useData";
import Device from "./Device";

const Devices = () => {
  const { devices } = useData();

  return (
    <div className="lg:col-span-1 md:col-span-2 col-span-2 flex flex-col w-full h-[calc(250px+1rem)] gap-2 p-2 bg-primary rounded-md">
      <h1 className="text-md text-center text-primary-foreground font-semibold">
        Devices
      </h1>
      <div
        className="flex flex-col gap-2 pr-2 overflow-y-auto
        scrollbar-thin scrollbar-track-transparent scrollbar-thumb-secondary-accent"
      >
        {devices &&
          devices.map((device, index) => (
            <Device key={index} device={device} />
          ))}
      </div>
    </div>
  );
};

export default Devices;
