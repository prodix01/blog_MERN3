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
                                <h1>개발블로그</h1>
                                <p>
                                    {" "}
                                    개발자 프로필/포트폴리오를 만들고, 다른 개발자들과 공유해보세요!
                                </p>
                                <hr/>
                                <Link to="register" className="btn btn-lg btn-info mr-2">
                                    회원가입
                                </Link>
                                <Link to="login" className="btn btn-lg btn-light">
                                    로그인
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