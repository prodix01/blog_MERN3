import React, {Component} from 'react';

import Footer from "./componets/layout/Footer";
import Navbar from "./componets/layout/Navbar";

import Landing from "./componets/layout/Landing";
import "./App.css"

class App extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Landing />
                <Footer />
            </div>
        );
    }
}

export default App;
