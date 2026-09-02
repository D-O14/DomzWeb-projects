//import { ScanBox } from "lucide-react";
//import DropDown from "./Components/Form/Dropdown/DropDown";
//import SearchBar from "./Components/Form/Search/SearchBar";
import Clock from "./Components/Clock/Clock";
import { MemoryStick, Volleyball, MonitorPlay, Ambulance, Palette, School, Gamepad, LifeBuoy } from "lucide-react";

const links = [
  { location: "Home", path: "#" },
  { location: "About", path: "#" },
  { location: "Projects", path: "#" },
  { location: "Studio", path: "#" },
  { location: "Contact", path: "#" },
]

const hobbies = [
  { hobby: "Teaching", icon: <School className="icon" /> },
  { hobby: "Inventing", icon: <MemoryStick className="icon" /> },
  { hobby: "Painting", icon: <Palette className="icon" /> },
  { hobby: "Volleyball", icon: <Volleyball className="icon" /> },
  { hobby: "Playing Games", icon: <Gamepad className="icon" /> },
  { hobby: "Watching Movies", icon: <MonitorPlay className="icon" /> },
  { hobby: "Offering Healthcare", icon: <Ambulance className="icon" /> },
  { hobby: "Community Service", icon: <LifeBuoy className="icon" /> },
];

function App() {
  return (
    <>
    </>
  );
};

export default App