import Devices from "../components/Devices";
import Logs from "../components/Logs";
import UptimeChart from "../components/UptimeChart";
import UptimePieChart from "../components/UptimePieChart";

const Home = () => {
  return (
    <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 w-full h-full gap-3 rounded-md">
      <Devices />
      <Logs />
      <UptimeChart />
      <UptimePieChart />
    </div>
  );
};

export default Home;
