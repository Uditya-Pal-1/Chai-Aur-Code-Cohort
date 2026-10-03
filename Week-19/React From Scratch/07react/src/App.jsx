import { useEffect, useState } from "react";
import { ChaiMenu } from "./AllChai";

const App = () => {
    const [message, setMessage] = useState("Loading...")

    useEffect(() => {
        fetch(`/api`)
            .then((res) => res.json())
            .then((data) => setMessage(data.message))
            .catch(() => setMessage("Failed to load"))
    }, []);

    return (
        <div>
            <h1>Welcome to chaiCode</h1>
            <p>Serving hot chai with react</p>
            <h2>{message}</h2>
            <ChaiMenu />
            <h3>{chai.name}</h3>
        </div>
    )
}

export { App };