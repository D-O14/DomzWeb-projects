import Clock from "./Clock";
import Header from "./Header";

const links = [
  { location: "Home", path: "#", className: "active" },
  { location: "About", path: "#"},
  { location: "Services", path: "#" },
  { location: "Contact", path: "#" },
  { location: "Blog", path: "#" },
]

function App() {
  return (
    <>
      <Header links={links} />
      <Clock />
    </>
  )
}

export default App