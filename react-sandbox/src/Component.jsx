import { useState } from "react";
import Button from "./Button/Button";

export default function Component() {
    const [cars, setCars] = useState([]);
    const [carYear, setCarYear] = useState(new Date().getFullYear());
    const [carMake, setCarMake] = useState("");
    const [carModel, setCarModel] = useState("");

    function addCar() {
        const newCar = { year: carYear, make: carMake, model: carModel };
        setCars(prevCars => [...cars, newCar]);
        setCarYear(new Date().getFullYear());
        setCarMake("");
        setCarModel("");
    };

    function removeCar(index) {
        setCars(prevCars => cars.filter((_, i) => { return i !== index }))
    };

    function yearChange(e) { setCarYear(e.target.value) };
    function makeChange(e) { setCarMake(e.target.value) };
    function modelChange(e) { setCarModel(e.target.value) };

    return (
        <>
            <div>
                <h2>List of Car objects</h2>
                <ul>
                    {cars.map((car, index) => {
                        return <li key={index} onClick={() => { removeCar(index) }}>
                            {car.year} {car.make} {car.model}
                        </li>
                    })}
                </ul>
                <input type="number" value={carYear} placeholder={carYear} onChange={(e) => { yearChange(e) }} />
                <input type="text" value={carMake} placeholder="Enter Car Make" onChange={(e) => { makeChange(e) }} />
                <input type="text" value={carModel} placeholder="Enter Car Model" onChange={(e) => { modelChange(e) }} />
                <Button text="Add Car" func={() => { addCar() }} />
            </div>
        </>
    );
};