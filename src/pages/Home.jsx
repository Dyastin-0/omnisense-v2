import Devices from "../components/Devices";

const Home = () => {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full h-full gap-3 rounded-md">
      <Devices />
    </div>
  );
};

export default Home;
