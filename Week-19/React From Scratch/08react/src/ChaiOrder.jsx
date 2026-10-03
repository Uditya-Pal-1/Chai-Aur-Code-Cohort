import { useState } from "react";


export function ChaiOrder() {
   const [chai, setChai] = useState(0);
    const serveChai = () =>{
        setChai((prev) => prev + 1);
    }

    return (
        <div>
            <h2>The ChaiOrder</h2>
            <p> You want {chai} cups of Chai. </p>
            <button onClick={serveChai}>serve chai</button>
        </div>
    )

}