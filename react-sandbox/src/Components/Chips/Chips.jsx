import { Check, Ticket } from "lucide-react"

export default function data({ data=[], className="row" }) {
    return (
        <>
            <menu className={className}>
                {data.map((chip, index) => {
                    return <button key={index} onClick={(e) => { chip?.action(e) }}
                        className={chip.className ? chip.className : ""}>
                        {chip.label}
                        <span>{chip.className? <Check /> : ""}</span>
                    </button>
                })}
            </menu>
            
        </>
    )   
}