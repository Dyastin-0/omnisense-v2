import Devices from "../components/Devices";
import Logs from "../components/Logs";
import { UsageChart } from "../components/UptimeChart";

const Home = () => {
  return (
    <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 w-full h-full gap-3 rounded-md">
      <UsageChart />
      <Devices />
      <Logs />
    </div>
  );
};

export default Home;
