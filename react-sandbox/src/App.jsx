import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";
import Card from "./Card";
import Button from "./Button/Button";
import Student from "./Student";

function App() {
  return (
    <>
      <Header />
      <Content />
      <Student name={"DomzWeb"} age={21} career={"Software Engineer"} isStudent={true} />
      <Student name={"Patrick"} age={42} career={"None"} isStudent={false} />
      <Student name={"Squidward"} age={50} career={"Cashier"} isStudent={false} />
      <Student name={"Sandy"} age={22} career={"Scientist"} isStudent={true} />
      <Footer />
    </>
  )
}

export default App