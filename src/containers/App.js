import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter as Router } from 'connected-react-router'
import { history } from '../redux'
import {
    userIsAuthenticated,
    userIsNotAuthenticated,
} from '../hoc/authentication'
import { path } from '../utils'
import Home from '../routes/Home'
import HomePage from './HomePage/HomePage'
import Login from '../containers/Auth/Login'
import 'antd/dist/antd.css'
import System from '../routes/System'
import ConfirmModal from '../components/ConfirmModal'
import CustomScrollbars from '../components/CustomScrollbars'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DetailDoctor from './Patient/Doctor/DetailDoctor'
import Doctor from '../routes/Doctor'
import VerifyEmail from './Patient/VerifyEmail'
class App extends Component {
    handlePersistorState = () => {
        const { persistor } = this.props
        let { bootstrapped } = persistor.getState()
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }))
            } else {
                this.setState({ bootstrapped: true })
            }
        }
    }

    componentDidMount() {
        this.handlePersistorState()
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <ConfirmModal />

                        <div className="content-container">
                            <CustomScrollbars
                                style={{ height: '100vh', width: '100%' }}>
                                <Switch>
                                    <Route
                                        path={path.HOME}
                                        exact
                                        component={Home}
                                    />
                                    <Route
                                        path={path.LOGIN}
                                        component={userIsNotAuthenticated(
                                            Login
                                        )}
                                    />
                                    <Route
                                        path={path.SYSTEM}
                                        component={userIsAuthenticated(System)}
                                    />
                                    <Route
                                        path={'/doctor'}
                                        component={userIsAuthenticated(Doctor)}
                                    />
                                    <Route
                                        path={path.HOMEPAGE}
                                        component={HomePage}
                                    />
                                    <Route
                                        path={path.DETAIL_DOCTOR}
                                        component={DetailDoctor}
                                    />
                                    <Route
                                        path={path.VERIFY_EMAIL_BOOKING}
                                        component={VerifyEmail}
                                    />
                                </Switch>
                            </CustomScrollbars>
                        </div>

                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />

                        <ToastContainer />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn,
    }
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
