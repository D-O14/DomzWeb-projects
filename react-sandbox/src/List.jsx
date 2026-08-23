import Card from "./Products/Card";

export default function List({ items = [] }) {
    items.sort((a, b) => a.name.localeCompare(b.name));
    const users = items.map((user, index) => {
        return <Card key={index} name={user.name} desc={user.desc} />
    });
    return (<>{users}</>);
};