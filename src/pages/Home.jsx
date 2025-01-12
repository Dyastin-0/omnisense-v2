import Devices from "../components/Devices";
import Logs from "../components/Logs";

const Home = () => {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full h-full gap-3 rounded-md">
      <Devices />
      <Logs />
    </div>
  );
};

export default Home;
