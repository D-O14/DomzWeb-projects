import Header from "./Header";
import Component from "./Component";

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
      <Component/>
    </>
  )
}

export default App