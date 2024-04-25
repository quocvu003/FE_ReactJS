import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import _ from 'lodash'
class ModalEditUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
    }
    componentDidMount() {
        let user = this.props.currentUser
        console.log(user)
        // let { currentUser } = this.propsis.props
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
            })
        }
    }

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
        let arrInput = ['email', 'firstName', 'lastName', 'address']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert('Missing required field: ' + arrInput[i])
                break
            }
        }
        return isValid
    }
    handleEditUser = () => {
        let isValid = this.checkValideInput()

        if (isValid === true) {
            // call api create modal

            this.props.editUser(this.state)
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
                    Edit user
                </ModalHeader>
                <ModalBody>
                    <div className="container">
                        <div className="row">
                            <div className="col-12 form-group">
                                <label className="">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    onChange={event => this.onChangeInput(event, 'email')}
                                    value={this.state.email}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 form-group">
                                <label className="">Fist Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={event => this.onChangeInput(event, 'firstName')}
                                    value={this.state.firstName}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label className="">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={event => this.onChangeInput(event, 'lastName')}
                                    value={this.state.lastName}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 form-group">
                                <label className="">Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={event => this.onChangeInput(event, 'address')}
                                    value={this.state.address}
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
                            this.handleEditUser()
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser)
