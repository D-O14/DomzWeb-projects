import { useState } from "react";

export default function () {
    const [name, setName] = useState("Guest");
    const [amount, setAmount] = useState(0);
    const [comment, setComment] = useState("hiiii");
    const [payment, setPayment] = useState("visa");
    const [shipping, setShipping] = useState("");
    function change(e) { setName(e.target.value) };
    function amountChange(e) { setAmount(e.target.value) };
    function commentChange(e) { setComment(e.target.value) };
    function paymentChange(e) { setPayment(e.target.value) };
    function shippingChange(e) { setShipping(e.target.value) };
    return (<>
        <form>
            <input type="text" value={name} onChange={(e) => { change(e) }} />
            <p>Name: {name}</p>
            <input type="number" value={amount} onChange={(e) => { amountChange(e) }} />
            <p>Amount: {amount}</p>
            <textarea value={comment} placeholder="Enter Additional Instructions" onChange={(e) => { commentChange(e) }}></textarea>
            <p>Comment: {comment}</p>
            <select value={payment} onChange={(e) => { paymentChange(e) }}>
                <option value="">Select an option</option>
                <option value="Visa">Visa</option>
                <option value="Mastercard">Mastercard</option>
                <option value="Giftcard">Giftcard</option>
            </select>
            <p>Payment: {payment}</p>
            <label>
                Pick up
                <input type="radio" value="Pick Up" checked={shipping === "Pick Up"}
                    onChange={(e) => { shippingChange(e) }} />
            </label>
            <label>
                Delivery
                <input type="radio" value="Delivery" checked={shipping === "Delivery"}
                    onChange={(e) => { shippingChange(e) }} />
            </label>
            <p>Shipping: {shipping}</p>
        </form>
    </>
    );
};