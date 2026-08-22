import Card from "./Card";

export default function List({ items = [] }) {
    items.sort((a, b) => a.name.localeCompare(b.name));
    const users = items.map(user => {
        return <Card key={user.id} name={user.name} desc={user.desc} />
    });
    return (<>{users}</>);
};