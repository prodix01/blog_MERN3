import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Landing extends Component {
    render() {
        return (
            <div className="landing">
                <div className="dark-overlay landing-inner text-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h1>Developer Connecter</h1>
                                <p>
                                    {" "}
                                    Create a developer profile/portfolio, share posts and get help from other develoers
                                </p>
                                <hr/>
                                <Link to="register" className="btn btn-lg btn-info mr-2">
                                    Sign up
                                </Link>
                                <Link to="login" className="btn btn-lg btn-light">
                                    Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Landing;