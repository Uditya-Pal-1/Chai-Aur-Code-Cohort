import React from "https://esm.sh/react@19.1.0";
import ReactDOM from "https://esm.sh/react-dom@19.1.0/client";


const Chai = (props) => {
    console.log(props);

    return React.createElement("div", {}, [
        React.createElement("h1", {}, props.name),
        React.createElement("p",{}, props.cost),
    ]);
};

const App = () => {
    return React.createElement("div", {}, [
        React.createElement("h1", {}, "Chai Variations by Chaicode"),
        React.createElement(Chai, {
            name: "Masala Chai",
            cost: "1000",
        }),
        React.createElement(Chai, {
            name: "Blue Tea",
            cost: "11000",
        }),
        React.createElement(Chai, {
            name: "Lemon Tea",
            cost: "500",
        }),
        React.createElement(Chai, {
            name: "Ice Tea",
            cost: "2000"
        }),
    ]);
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
