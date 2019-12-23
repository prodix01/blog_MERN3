import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import Footer from "./componets/layout/Footer";
import Navbar from "./componets/layout/Navbar";
import Landing from "./componets/layout/Landing";
import Register from "./componets/auth/Register";
import Login from "./componets/auth/Login";
import "./App.css"

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Navbar/>
                    <Route exact path="/" component={Landing} />
                    <div className="container">
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                    </div>
                    <Footer/>
                </div>
            </Router>
        );
    }
}

export default App;
