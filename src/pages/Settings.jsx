import useSettings from "../hooks/useSettings";
import Toggle from "../components/Toggle";
import useData from "../hooks/useData";
import Separator from "../components/ui/Separator";
import Checkbox from "../components/ui/Checkbox";
import useToast from "../components/hooks/useToast";
import useTheme from "../hooks/useTheme";

export const Settings = () => {
  const {
    toggleIncludeDevice,
    areDevicesIncluded,
    toggleIncludeInactiveDays,
    areInactiveDaysIncluded,
    setSelectedInstance,
    selectedInstance,
  } = useSettings();
  const { instances, microcontroller } = useData();
  const { theme,
    toggleTheme } = useTheme();
  const { toastInfo } = useToast();

  return (
    <div className="flex flex-col bg-[var(--bg-primary)] rounded-md text-sm w-full h-full gap-4 px-4 py-3">
      <p className="text-sm font-medium text-[var(--text-secondary)]">General</p>
      <Separator />
      <div className="flex items-center justify-between">
        {instances?.length > 0 &&
          instances.map(instance =>
            <Checkbox
              key={instance}
              value={instance}
              name={instance}
              onChecked={() => {
                if (instance == selectedInstance) {
                  toastInfo("Instance already set to " + instance + ".");
                  return;
                }
                setSelectedInstance(instance);
              }}
            />
          )
        }
        <p className="text-sm">Instance</p>
      </div>
      <div className="flex items-center justify-between">
        <Toggle
          value={theme === "dark"}
          onClick={toggleTheme}
        />
        <p className="text-sm">Dark mode</p>
      </div>
      <Separator />
      <p className="font-medium text-[var(--text-secondary)]">Chart</p>
      <div className="flex items-center justify-between">
        <Toggle
          value={areDevicesIncluded}
          onClick={toggleIncludeDevice}
        />
        <p className="text-sm">Include devices</p>
      </div>
      <div className="flex items-center justify-between">
        <Toggle
          value={areInactiveDaysIncluded}
          onClick={toggleIncludeInactiveDays}
        />
        <p className="text-sm">Include inactive days</p>
      </div>
      <Separator />
      <p className="font-medium text-[var(--text-secondary)]">Microcontroller</p>
      <h5 className="text-base">{microcontroller}</h5>
    </div>
  );
};

export default Settings;
