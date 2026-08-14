export default function ({ id = "input", placeholder = "Input data here", type = "text", name = "name", autoComplete }) {
    return (
        <>
            <label htmlFor={id}>
                <input type={type} placeholder={placeholder} id={id} name={name} autoComplete={autoComplete}/>
            </label>
        </>
    );
};