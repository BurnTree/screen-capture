import React, {Component} from 'react';
import SomeFragment from "./component/SomeFragment";
import Header from "./component/Header/Header";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {

    render() {
        return (
            <div>
                <ToastContainer/>
                <Header/>
                <SomeFragment/>
            </div>
        );
    }
}

export default App;
