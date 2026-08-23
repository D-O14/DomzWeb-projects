import List from "./List";

const people = [
    { name: "DomzWeb", desc: "I am a UI/UX designer, web developer" },
    { name: "Annie McGarth", desc: "I'm the financial manager of DomzWeb Inc" },
    { name: "Joseph Izrael", desc: "I am the chairman executive officer of motion UI" },
    { name: "Platos", desc: "I'm something of a greek philosopher myself" },
    { name: "Jonathan Doe", desc: "Lowkirkuinely just a chill guy frfr fromn the states" }
];

export default function Content() {
    return (
        <>
        <div className="cards">
            <List items={people} />
        </div>
        </>
    );
};