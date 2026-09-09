//import { ScanBox } from "lucide-react";
//import DropDown from "./Components/Form/Dropdown/DropDown";
//import SearchBar from "./Components/Form/Search/SearchBar";
//import Clock from "./Components/Clock/Clock";
import { useState } from "react";
import Form from "./Components/Form/Form";
import { MemoryStick, Volleyball, MonitorPlay, Ambulance, Palette, School, Gamepad, LifeBuoy, Rocket, CheckCircle, User } from "lucide-react";
//import Toast from "./Components/Toast/Toast";
import Feedback from "./Components/Toast/Feedback";

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
  /*const [revealed, setRevealed] = useState(false);
  function reveal() { !revealed ? setRevealed(true) : setRevealed(false) };*/
  return (
    <>
      <Form/>
    </>
  );
};

export default App