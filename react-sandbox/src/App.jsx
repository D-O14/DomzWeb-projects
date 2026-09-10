//import { ScanBox } from "lucide-react";
import DropDown from "./Components/Form/Dropdown/DropDown";
//import SearchBar from "./Components/Form/Search/SearchBar";
import Clock from "./Components/Clock/Clock";
import { useState } from "react";
import Form from "./Components/Form/Form";
import { MemoryStick, Volleyball, MonitorPlay, Ambulance, Palette, School, Gamepad, LifeBuoy, Rocket, CheckCircle, User } from "lucide-react";
//import Toast from "./Components/Toast/Toast";
import Feedback from "./Components/Toast/Feedback";
import Chips from "./Components/Chips/Chips";

function click(e) { console.log(`${ e.target.textContent } Button was clicked!`) };

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

const sortChips = [
  { label: "Recently Updated", action: (e) => { click(e) }, className: "use" },
  { label: "Newest First", action: (e) => { click(e) } },
  { label: "Oldest First", action: (e) => { click(e) } },
  { label: "Title A-Z", action: (e) => { click(e) } },
  { label: "Title Z-A", action: (e) => { click(e) } },
];

const filterChips = [
  { label: "All", action: (e) => { click(e) }, className: "use" },
  { label: "Today", action: (e) => { click(e) } },
  { label: "Yesterday", action: (e) => { click(e) } },
  { label: "This Week", action: (e) => { click(e) } },
  { label: "Older", action: (e) => { click(e) } },
];

function App() {
  return (
    <>
      <div className="rows">
        <Chips data={sortChips} />
        <Chips data={filterChips} />
      </div>
    </>
  );
};

export default App