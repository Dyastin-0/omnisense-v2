import { Link } from "react-router-dom";

const Omnisense = () => {
  return (
    <Link
      className="outline-none rounded-md
		transition-all durantion-300 focus:shadow-[var(--accent-secondary)_0_0_0_2px]"
      to="/"
    >
      <div className="flex justify-center items-center h-full font-semibold">
        <h1 className="text-primary-highlight">Omni</h1>
        <h1 className="text-primary-foreground">sense</h1>
      </div>
    </Link>
  );
};

export default Omnisense;
