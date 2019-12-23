import React, {Component} from 'react';
import axios from "axios";
import classnames from "classnames";

class Register extends Component {

    //함수
    //상태값
    //라이프사이클
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
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

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        axios
            .post("/users/register", newUser)
            .then(res => console.log(res.data))
            .catch(err => this.setState({errors : err.response.data}));
    }

    render() {
        //상태값 재선언
        const {name, email, password, password2, errors} = this.state;

        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">회원가입</h1>
                            <p className="lead text-center">회원가입후 블로그를 이용해보세요!</p>
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid" : errors.name
                                        })}
                                        placeholder="닉네임"
                                        name="name"
                                        value={name}
                                        onChange={this.onChange}
                                    />
                                    {errors.name && (
                                        <div className="invalid-feedback">{errors.name}</div>
                                    )}
                                </div>
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
                                    <small className="form-text text-muted">
                                        이 블로그는 Gravatar로 아바타가 자동등록됩니다. 다른 아바타를 등록하시려면 Gravatar 이메일을 등록해주세요.
                                    </small>
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
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid" : errors.password2
                                        })}
                                        placeholder="패스워드 재입력"
                                        name="password2"
                                        value={password2}
                                        onChange={this.onChange}
                                    />
                                    {errors.password2 && (
                                        <div className="invalid-feedback">{errors.password2}</div>
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

export default Register;