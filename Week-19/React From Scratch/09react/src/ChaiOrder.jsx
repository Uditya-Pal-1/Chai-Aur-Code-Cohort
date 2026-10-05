import { useState } from "react";

export function chaiOrder(){
    const [chaiCount, setChaiCount] = useState(0)

    const serveChai = () => {
        setChaiCount((prev) => prev + 1)
    }

    return (
        <div>
            <h2>Chai Counter</h2>
            <p>You have served {chaiCount} cup of tea</p>
            <button onClick={serveChai}>Chai Lao</button>
        </div>
    )
}