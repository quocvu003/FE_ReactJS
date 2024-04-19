import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import * as actions from '../../store/actions'
import { handleLoginAPI } from '../../services/userService'

import './Login.scss'
import { FormattedMessage } from 'react-intl'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
        }
    }
    handleLogin = async () => {
        console.log('name :', this.state.username, 'password :', this.state.password)
        try {
            await handleLoginAPI(this.state.username, this.state.password)
        } catch (err) {
            console.log('error :', err)
        }
    }
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        })
    }

    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content">
                        <div className="col-12 text-login">Login</div>
                        <div className="col-12 form-group">
                            <div className=" col-12 form-group login-input">
                                <label>Username:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Username"
                                    value={this.state.username}
                                    onChange={event =>
                                        this.setState({ username: event.target.value })
                                    }></input>
                            </div>
                            <div className=" col-12 form-group login-input">
                                <label>Password:</label>
                                <div className="custom-input-password">
                                    <input
                                        type={this.state.isShowPassword ? 'text' : 'password'}
                                        className="form-control"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={event =>
                                            this.setState({ password: event.target.value })
                                        }
                                    />
                                    <span onClick={() => this.handleShowHidePassword()}>
                                        <i
                                            className={
                                                this.state.isShowPassword
                                                    ? 'far fa-eye'
                                                    : 'far fa-eye-slash'
                                            }></i>
                                    </span>
                                </div>
                            </div>

                            <div className="col-12">
                                <button className="btn-login" onClick={() => this.handleLogin()}>
                                    Login
                                </button>
                            </div>
                            <div className="col-12">
                                <span className="forgot-password">Forgot your password?</span>
                            </div>
                            <div className="col-12 text-center mt-3">
                                <span className="text-other-login">Or Login with:</span>

                                <div className="col-12 social-login">
                                    <i className="fab fa-google-plus-g google"></i>
                                    <i className="fab fa-facebook-f facebook"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        navigate: path => dispatch(push(path)),
        adminLoginSuccess: adminInfo => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
