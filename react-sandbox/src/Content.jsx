import List from "./List";

const people = [
    { id: crypto.randomUUID(), name: "DomzWeb", desc: "I am a UI/UX designer, web developer" },
    { id: crypto.randomUUID(), name: "Annie McGarth", desc: "I'm the financial manager of DomzWeb Inc" },
    { id: crypto.randomUUID(), name: "Joseph Izrael", desc: "I am the chairman executive officer of motion UI" },
    { id: crypto.randomUUID(), name: "Platos", desc: "I'm something of a greek philosopher myself" },
    { id: crypto.randomUUID(), name: "Jonathan Doe", desc: "Lowkirkuinely just a chill guy frfr fromn the states" }
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