import Navbar from "./Navbars/navbar - menu/navbar.jsx";

const links = [
  { location: "Home", path: "#" },
  { location: "About", path: "#" },
  { location: "Projects", path: "#" },
  { location: "Studio", path: "#" },
  { location: "Contact", path: "#" },
]

function App() {
  return (
    <>
      <Navbar links={links} />
    </>
  );
};

export default App