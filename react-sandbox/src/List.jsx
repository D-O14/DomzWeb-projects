import PropTypes from "prop-types";

/*const fruits = [
    { itemid: 1, name: "Apple", cal: 95 },
    { itemid: 2, name: "Orange", cal: 45 },
    { itemid: 3, name: "Banana", cal: 105 },
    { itemid: 4, name: "Coconut", cal: 159 },
    { itemid: 5, name: "Pineapple", cal: 37 }
];

const vegetables = [
    { itemid: 6, name: "Potatoes", cal: 110 },
    { itemid: 7, name: "Celery", cal: 15 },
    { itemid: 8, name: "Carrots", cal: 25 },
    { itemid: 9, name: "Corn", cal: 63 },
    { itemid: 10, name: "Broccoli", cal: 50 }
];*/

export default function List({ category="category", items=[] }) {
    items.sort((a, b) => a.name.localeCompare(b.name));
    const fruitItems = items.map(item => {
        return <li key={item.itemid}>
            {item.name}: &nbsp;<b>{item.cal}cal</b></li>
    });
    return (
        <>
            <h3 className="category">{category}</h3>
            <ol className="list-items">{fruitItems}</ol>
        </>
    );
};

List.propTypes = {
    item: PropTypes.arrayOf(PropTypes.shape({
        itemid: PropTypes.number,
        name: PropTypes.string,
        cal: PropTypes.number,
    })),
    category: PropTypes.string,
}