import React from "https://esm.sh/react"
import ReactDOM from "https://esm.sh/react-dom/client"

const Chai = (props) => {
    console.log(props);

    return React.createElement("div", {}, [
        React.createElement("h1",{}, props.name),
        React.createElement("p", {}, props.cost),
    ]);
};

const App = () => {
    return React.createElement("div", {}, [
        React.createElement("h1", {}, "Chai Variations by ChaiCode"),
        React.createElement(Chai, {
            name: "Blue Tea",
            cost: "12000",
        }),
        React.createElement(Chai, {
            name: "Ginger Tea",
            cost: "2000",
        }),
        React.createElement(Chai, {
            name: "Cold Tea",
            cost: "5000"
        }),
    ]);
};

const container = document.getElementById("root")
const root = ReactDOM.createRoot(container)
root.render(React.createElement(App));