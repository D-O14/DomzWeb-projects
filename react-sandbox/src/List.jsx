function List() {
    const fruits = [
        { itemid:1, name: "Apple", cal: 95 },
        { itemid: 2, name: "Orange", cal: 45 },
        { itemid: 3, name: "Banana", cal: 105 },
        { itemid: 4, name: "Coconut", cal: 159 },
        { itemid: 5, name: "Pineapple", cal: 37 }
    ];
    fruits.sort((a, b) => a.name.localeCompare(b.name));
    const fruitItems = fruits.map(fruit => {
        return <li key={fruit.itemid}>
            {fruit.name}: &nbsp;<b>{fruit.cal}cal</b></li>
    });
    return (<ol>{fruitItems}</ol>);
}

export default List;