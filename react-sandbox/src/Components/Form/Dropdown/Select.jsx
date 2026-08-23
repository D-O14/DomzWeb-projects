export default function ({ items = [] }) {
    const data = items.map(item => {
        return <option key={item} value={item}>{item}</option>
    });
    return (
        <>
            <select>
                <option value="">Select One</option>
                {data}
            </select>
        </>
    )
}