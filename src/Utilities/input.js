export default function searchItems({ input, items, property }) {
    const value = input.value.toLowerCase().trim();
    const searched = items.filter(item => {
        const field = item[property];
        return typeof field && field.includes(value);
    });
    return searched;
}