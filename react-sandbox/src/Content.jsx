import Card from "./Card";

function Content() {
    return (
        <>
            <div className="cards">
                <Card name="DomzWeb" desc="I am a UI/UX designer, web developer"/>
                <Card name="Annie McGarth" desc="I'm the financial manager of DomzWeb Inc"/>
                <Card name="Joseph" desc="I am the chairman executive officer of motion UI"/>
                <Card name="Platos" desc="I'm something of a greek philosopher myself"/>
            </div>
        </>
    );
};

export default Content;