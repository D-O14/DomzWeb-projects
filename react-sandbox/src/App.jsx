//import { ScanBox } from "lucide-react";
//import SearchBar from "./Components/Form/Search/SearchBar";
//import Tooltip from "./Components/Tooltip/Tooltip";
import { MemoryStick, Volleyball, MonitorPlay, Ambulance, Palette, School, Gamepad, LifeBuoy } from "lucide-react";
import DropDown from "./Components/Form/Dropdown/DropDown";

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
      <DropDown ltr={false} selectText="What are your hobbies?" items={hobbies} property="hobby" />
    </>
  );
};

export default App