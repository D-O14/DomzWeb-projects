import { useState } from "react"

export default function () {
    const [car, setCar] = useState({ year: 2024, make: "Ford", model: "Mustang" });
    function updateCarYear(e) { setCar(prevCar => ({ ...car, year: e.target.value })) };
    function updateCarMake(e) { setCar(prevCar => ({ ...car, make: e.target.value })) };
    function updateCarModel(e) { setCar(prevCar => ({ ...car, model: e.target.value })) };
    return (
        <>
            <div>
                <p>Your favourite car is: {car.year} {car.make} {car.model}</p>
                <label>
                    Year of Car:
                    <input type="number" value={car.year} onChange={(e) => { updateCarYear(e) }} />
                </label>
                <label>
                    Make of Car:
                    <input type="text" value={car.make} onChange={(e) => { updateCarMake(e) }} />
                </label>
                <label>
                    Car Model:
                    <input type="text" value={car.model} onChange={(e) => { updateCarModel(e) }} />
                </label>
            </div>
        </>
    );
}