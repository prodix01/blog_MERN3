import React, {Component} from 'react';

import Footer from "./componets/layout/Footer";
import Navbar from "./componets/layout/Navbar";

class App extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Footer />
            </div>
        );
    }
}

export default App;
