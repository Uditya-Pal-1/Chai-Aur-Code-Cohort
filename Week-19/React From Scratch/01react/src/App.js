import React from "https://esm.sh/react"; 
import ReactDOM from "https://esm.sh/react-dom/client";

const App =() => {
    return React.createElement(
        "div",
        {},
        React.createElement("h1",{},"Chai, chill & react")
    )
}

const container = document.getElementById("root")
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App))