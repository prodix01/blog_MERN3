import React, {Component} from 'react';
import axios from "axios";
import classnames from "classnames";

class Login extends Component {

    //함수
    //상태값
    //라이프사이클
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange (e) {
        this.setState({ [e.target.name] : e.target.value})
    }

    onSubmit (e) {
        e.preventDefault();

        const loginUser = {
            email: this.state.email,
            password: this.state.password
        };

        axios
            .post("/users/login", loginUser)
            .then(res => console.log(res.data))
            .catch(err => this.setState({errors : err.response.data}));
    }

    render() {
        //상태값 재선언
        const {email, password, errors} = this.state;

        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">로그인</h1>
                            <p className="lead text-center">블로그에 오신걸 환영합니다!</p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid" : errors.email
                                        })}
                                        placeholder="이메일"
                                        name="email"
                                        value={email}
                                        onChange={this.onChange}
                                    />
                                    {errors.email && (
                                        <div className="invalid-feedback">{errors.email}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid" : errors.password
                                        })}
                                        placeholder="패스워드"
                                        name="password"
                                        value={password}
                                        onChange={this.onChange}
                                    />
                                    {errors.password && (
                                        <div className="invalid-feedback">{errors.password}</div>
                                    )}
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;