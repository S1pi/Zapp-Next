import ZonePicker from "./components/ZonePicker";
import { ZoneSelection } from "./components/ZoneSelection";

export default function ParkingZones() {
  return (
    <div className="flex flex-col gap-4 max-h-full h-screen overflow-y-auto">
      <h1 className="text-2xl font-bold text-seabed-green">Parking Zones</h1>
      <div className="flex flex-col gap-4">
        <p className="text-black-zapp/50">Manage your parking zones here.</p>
        <div>
          <p className="text-black-zapp/50">
            Add, edit, or delete zones. (For now just add :D)
          </p>
          <p className="text-black-zapp/50">
            Click on the icon on the map right top corner to add a new zone.
          </p>
        </div>
      </div>
      <ZoneSelection />
    </div>
  );
}
