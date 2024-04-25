import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
class ModalUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
    }
    componentDidMount() {}

    toggle = () => {
        this.props.toggleUserModalParent()
    }

    onChangeInput = (event, id) => {
        let copystate = { ...this.state }
        copystate[id] = event.target.value
        this.setState({
            ...copystate,
        })
    }
    checkValideInput = () => {
        let isValid = true
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert('Missing required field: ' + arrInput[i])
                break
            }
        }
        return isValid
    }
    handleAddNewUser = () => {
        let isValid = this.checkValideInput()

        if (isValid === true) {
            // call api create modal

            this.props.createNewUser(this.state)
        }
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => {
                    this.toggle()
                }}
                size="lg"
                centered>
                <ModalHeader
                    toggle={() => {
                        this.toggle()
                    }}
                    lUser>
                    Create a new user
                </ModalHeader>
                <ModalBody>
                    <div className="container">
                        <div className="row">
                            <div className="col-6 form-group">
                                <label className="">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    onChange={event => this.onChangeInput(event, 'email')}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label className="">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    onChange={event => this.onChangeInput(event, 'password')}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 form-group">
                                <label className="">Fist Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Fist Name"
                                    onChange={event => this.onChangeInput(event, 'firstName')}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label className="">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Last Name"
                                    onChange={event => this.onChangeInput(event, 'lastName')}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 form-group">
                                <label className="">Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Address"
                                    onChange={event => this.onChangeInput(event, 'address')}
                                />
                            </div>
                            {/* <div className="col-6 form-group">
                                <label className="">Gender</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Last Name"
                                />
                            </div> */}
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        className="px-3"
                        onClick={() => {
                            this.handleAddNewUser()
                        }}
                        lUser>
                        Save
                    </Button>{' '}
                    <Button
                        color="secondary"
                        className="px-2"
                        onClick={() => {
                            this.toggle()
                        }}
                        lUser>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser)
