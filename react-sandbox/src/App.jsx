import Header from "./Header";
import Content from "./Content";


function App(props) {
  return (
    <>
      <Header />
      <main>
        <section>
          <Content />
        </section>
      </main>
    </>
  )
}

export default App