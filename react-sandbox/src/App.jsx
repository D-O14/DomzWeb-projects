import { ScanBox } from "lucide-react";
import SearchBar from "./Components/Form/Search/SearchBar";

/*const links = [
  { location: "Home", path: "#" },
  { location: "About", path: "#" },
  { location: "Projects", path: "#" },
  { location: "Studio", path: "#" },
  { location: "Contact", path: "#" },
]*/


const data = [
  { num: "one", figure: 1 },
  { num: "two", figure: 2 },
  { num: "three", figure: 3 },
  { num: "four", figure: 4 },
  { num: "five", figure: 5 },
  { num: "six", figure: 6 },
];

function App() {
  return (
    <>
      <SearchBar placeholder="Find anything you want" icon={<ScanBox />} items={data} property="num" />
    </>
  );
};

export default App