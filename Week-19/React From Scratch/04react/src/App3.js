import React from "https://asm.sh/react"
import ReactDOM from "https://asm.sh/react-dom"

const Chai = (props) => {
    console.log(props)

    return React.createElement("div", {}, [
        React.createElement("h1", {}, props.name),
        React.createElement("p", {}, props.cost),
    ]);
};

const App = () => {
    return React.createElement("div", {}, [
        React.createElement("h1", {}, "Chai Variations by ChaiCode"),
        React.createElement(Chai, {
            name: "Masala Chai",
            cost: "1200",
        }),
        React.createElement(Chai, {
            name: "Blue Tea",
            cost: "13000",
        }),
        React.createElement(Chai, {
            name: "Green Tea",
            cost: "500",
        }),
        React.createElement(Chai, {
            name: "Olong Tea",
            cost: "7000",
        }),
        React.createElement(Chai,{
            name: "Cold Ice Tea",
            cost: "4000",
        }),
    ]);
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
