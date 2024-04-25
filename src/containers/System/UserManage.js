import React, { Component } from 'react'
import { connect } from 'react-redux'
import './UserManage.scss'
import {
    getAllUser,
    createNewUserService,
    deleteUserService,
    editUserService,
} from '../../services/userService'
import ModalUser from './ModalUser'
import ModalEditUser from './ModalEditUser'
class UserManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrUsers: [],
            isOpenModal: false,
            isOpenModalEdit: false,
            userEdit: {},
        }
    }

    async componentDidMount() {
        this.getAllUsersFromReact()
    }
    getAllUsersFromReact = async () => {
        let res = await getAllUser('ALL')
        if (res && res.errCode === 0) {
            this.setState({
                arrUsers: res.users,
            })
        }
    }
    handleAddNewUser = () => {
        this.setState({
            isOpenModal: true,
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal,
        })
    }
    toggleUserModalEdit = () => {
        this.setState({
            isOpenModalEdit: !this.state.isOpenModalEdit,
        })
    }
    handleCreateNewUser = async data => {
        try {
            let res = await createNewUserService(data)
            if (res && res.errCode !== 0) {
                alert(res.errMessage)
            } else {
                this.getAllUsersFromReact()
                this.setState({
                    isOpenModal: false,
                })
            }
        } catch (e) {
            console.log(e)
        }
    }
    handleDeleteUser = async user => {
        try {
            let res = await deleteUserService(user.id)
            if (res && res.errCode !== 0) {
                alert(res.errMessage)
            } else {
                this.getAllUsersFromReact()
            }
        } catch (e) {
            console.log(e)
        }
    }
    handleEditUser = async user => {
        this.setState({
            isOpenModalEdit: true,
            userEdit: user,
        })
    }
    handleDoEditUser = async data => {
        try {
            let res = await editUserService(data)
            if (res && res.errCode !== 0) {
                alert(res.errMessage)
            } else {
                this.getAllUsersFromReact()
                this.setState({
                    isOpenModalEdit: false,
                })
            }
        } catch (e) {
            console.log(e)
        }
    }
    render() {
        let arrUsers = this.state.arrUsers

        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModal}
                    toggleUserModalParent={this.toggleUserModal}
                    createNewUser={this.handleCreateNewUser}
                />
                {this.state.isOpenModalEdit && (
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEdit}
                        toggleUserModalParent={this.toggleUserModalEdit}
                        currentUser={this.state.userEdit}
                        editUser={this.handleDoEditUser}
                    />
                )}
                <div className="title text-center">Manage users</div>
                <div className="mx-1">
                    <button
                        className="btn btn-primary px-2"
                        onClick={() => this.handleAddNewUser()}>
                        <i className="fas fa-plus"></i> Add new user
                    </button>
                </div>
                <div className="users-table mt-4 mx-3">
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>

                        {arrUsers &&
                            arrUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button
                                                className="btn-edit"
                                                onClick={() => this.handleEditUser(item)}>
                                                <i className="fas fa-user-edit"></i>
                                            </button>
                                            <button
                                                className="btn-delete"
                                                onClick={() => this.handleDeleteUser(item)}>
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManage)
