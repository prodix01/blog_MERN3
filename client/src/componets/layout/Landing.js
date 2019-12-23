import React, {Component} from 'react';

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
                                <a href="register.html" className="btn btn-lg btn-info mr-2">
                                    Sign up
                                </a>
                                <a href="login.html" className="btn btn-lg btn-light">
                                    Login
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Landing;