import Header from "./Header";
import Navbar from "./Navbars/navbar - menu/navbar.jsx";

const links = [
  { location: "Home", path: "#", className: "active" },
  { location: "About", path: "#" },
  { location: "Services", path: "#" },
  { location: "Contact", path: "#" },
  { location: "Blog", path: "#" },
]

function App() {
  return (
    <>
      <Header links={links} />
      <Navbar/>
    </>
  );
};

export default App