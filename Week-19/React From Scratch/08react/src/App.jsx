import { useEffect, useState } from "react";
import { AllChai } from "./AllChai.jsx"
import { useSpecialChai} from "./hooks/useSpecialChai.js"

const App = () => {
    const [message, setMessage] = useState("Loading...")
    const [chai, loading, error] = useSpecialChai();

    useEffect(() => {
        fetch(`/api`)
            .then((res) => res.json())
            .then((data) => setMessage(data.message))
            .catch(() => setMessage("Failed to load"))
    }, []);

    if(loading) return <h2>loading...</h2>
    if(error) return <h2>Error: {error}</h2>

    return (
        <div>
            <h1>Welcome to chaiCode</h1>
            <p>Serving hot chai with react</p>
            <h2>{message}</h2>
            <AllChai />
            <h3>{chai.name}</h3>
        </div>
    )
}

export { App };