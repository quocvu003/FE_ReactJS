import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils'
import * as actions from '../../../store/actions'
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'
import TableManageUser from './TableManageUser'
class UserRedux extends Component {
    constructor(props) {
        super(props)
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImg: '',
            isOpen: false,
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
            action: '',
        }
    }
    async componentDidMount() {
        this.props.getGenderStart()
        this.props.getPositionStart()
        this.props.getRoleStart()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux,
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionArr: this.props.positionRedux,
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArr: this.props.roleRedux,
            })
        }
        // reset state when created new user
        if (prevProps.userRedux !== this.props.userRedux) {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: '',
                position: '',
                role: '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE,
                previewImg: '',
            })
        }
    }
    handleImage = async e => {
        let file = e.target.files[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)

            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImg: objectUrl,
                avatar: base64,
            })
        }
    }
    handlePreviewImage = () => {
        if (!this.state.previewImg) return
        this.setState({
            isOpen: true,
        })
    }
    handleValidate = () => {
        let arrCheck = [
            'email',
            'password',
            'firstName',
            'lastName',
            'phoneNumber',
            'address',
        ]
        let isValid = true
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false
                alert('Please enter a valid :' + arrCheck[i])
                break
            }
        }
        return isValid
    }
    handleSaveUser = e => {
        let isValid = this.handleValidate()
        if (isValid === false) return
        let { action } = this.state
        if (action === CRUD_ACTIONS.CREATE) {
            this.props
                .createNewUser({
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    phoneNumber: this.state.phoneNumber,
                    gender: this.state.gender,
                    roleId: this.state.role,
                    positionId: this.state.position,
                    avatar: this.state.avatar,
                })
                .then(() => {
                    // This code will execute after createNewUser is completed
                    this.props.fetchAllUser()
                })
                .catch(error => {
                    // Handle any errors that occur during createNewUser
                    console.error('Error creating new user:', error)
                })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props
                .EditUser({
                    id: this.state.id,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    phoneNumber: this.state.phoneNumber,
                    gender: this.state.gender,
                    roleId: this.state.role,
                    positionId: this.state.position,
                    avatar: this.state.avatar,
                })
                .then(() => {
                    // This code will execute after createNewUser is completed
                    this.props.fetchAllUser()
                })
                .catch(error => {
                    // Handle any errors that occur during createNewUser
                    console.error('Error creating new user:', error)
                })
        }
    }
    onChangeInput = (e, id) => {
        let copyState = { ...this.state }
        copyState[id] = e.target.value
        this.setState({ ...copyState })
    }
    handleEditUserParent = user => {
        let imageBase64 = ''
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary')
        }
        console.log('check', user)
        this.setState({
            id: user.id,
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: user.avatar,
            previewImg: imageBase64,
            action: CRUD_ACTIONS.EDIT,
        })
    }
    render() {
        let genders = this.state.genderArr
        let positions = this.state.positionArr
        let roles = this.state.roleArr
        let language = this.props.language

        let {
            email,
            password,
            firstName,
            lastName,
            phoneNumber,
            address,
            gender,
            position,
            role,
        } = this.state

        return (
            <div>
                <div className="container">
                    <h2 className="title">
                        <FormattedMessage id="manage-user.title" />
                    </h2>
                    <p>
                        <FormattedMessage id="manage-user.add" />
                    </p>
                    <div className="row">
                        <div className="col-3">
                            <label>
                                <FormattedMessage id="manage-user.email" />
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={e => {
                                    this.onChangeInput(e, 'email')
                                }}
                                disabled={
                                    this.state.action === CRUD_ACTIONS.EDIT
                                }></input>
                        </div>
                        <div className="col-3">
                            <label>
                                <FormattedMessage id="manage-user.password" />
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={password}
                                onChange={e => {
                                    this.onChangeInput(e, 'password')
                                }}
                                disabled={
                                    this.state.action === CRUD_ACTIONS.EDIT
                                }></input>
                        </div>

                        <div className="col-3">
                            <label>
                                <FormattedMessage id="manage-user.first-name" />
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={firstName}
                                onChange={e => {
                                    this.onChangeInput(e, 'firstName')
                                }}></input>
                        </div>
                        <div className="col-3">
                            <label>
                                <FormattedMessage id="manage-user.last-name" />
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={lastName}
                                onChange={e => {
                                    this.onChangeInput(e, 'lastName')
                                }}></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <label>
                                <FormattedMessage id="manage-user.phone" />
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={phoneNumber}
                                onChange={e => {
                                    this.onChangeInput(e, 'phoneNumber')
                                }}></input>
                        </div>
                        <div className="col-9">
                            <label>
                                <FormattedMessage id="manage-user.address" />
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={address}
                                onChange={e => {
                                    this.onChangeInput(e, 'address')
                                }}></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <label>
                                <FormattedMessage id="manage-user.gender" />
                            </label>
                            <select
                                className="form-control"
                                onChange={e => {
                                    this.onChangeInput(e, 'gender')
                                }}
                                value={gender}>
                                <option selected value=""></option>
                                {genders &&
                                    genders.length > 0 &&
                                    genders.map((item, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={item.keyMap}>
                                                {language === LANGUAGES.VI
                                                    ? item.valueVI
                                                    : item.valueEN}
                                            </option>
                                        )
                                    })}
                            </select>
                        </div>
                        <div className="col-3">
                            <label>
                                <FormattedMessage id="manage-user.position" />
                            </label>
                            <select
                                className="form-control"
                                onChange={e => {
                                    this.onChangeInput(e, 'position')
                                }}
                                value={position}>
                                <option selected></option>
                                {positions &&
                                    positions.length > 0 &&
                                    positions.map((item, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={item.keyMap}>
                                                {language === LANGUAGES.VI
                                                    ? item.valueVI
                                                    : item.valueEN}
                                            </option>
                                        )
                                    })}
                            </select>
                        </div>
                        <div className="col-3">
                            <label>
                                <FormattedMessage id="manage-user.role" />
                            </label>

                            <select
                                className="form-control"
                                onChange={e => {
                                    this.onChangeInput(e, 'role')
                                }}
                                value={role}>
                                <option selected></option>
                                {roles &&
                                    roles.length > 0 &&
                                    roles.map((item, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={item.keyMap}>
                                                {language === LANGUAGES.VI
                                                    ? item.valueVI
                                                    : item.valueEN}
                                            </option>
                                        )
                                    })}
                            </select>
                        </div>
                        <div className="col-3">
                            <label>
                                <FormattedMessage id="manage-user.image" />
                            </label>

                            <div className="preview-image-container">
                                <input
                                    type="file"
                                    onChange={e => this.handleImage(e)}></input>
                                <div
                                    className="preview-image"
                                    style={{
                                        backgroundImage: `url(${this.state.previewImg})`,
                                    }}
                                    onClick={() =>
                                        this.handlePreviewImage()
                                    }></div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-5 button-borders">
                        <button
                            className=" primary-button"
                            onClick={e => this.handleSaveUser(e)}>
                            <FormattedMessage id="manage-user.save" />
                        </button>
                    </div>

                    {this.state.isOpen && (
                        <Lightbox
                            mainSrc={this.state.previewImg}
                            onCloseRequest={() =>
                                this.setState({ isOpen: false })
                            }
                        />
                    )}
                    <TableManageUser
                        handleEditUserParent={this.handleEditUserParent}
                        actions={this.state.action}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        userRedux: state.admin.users,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: data => dispatch(actions.createNewUser(data)),
        fetchAllUser: () => dispatch(actions.fetchAllUser()),
        EditUser: data => dispatch(actions.EditUser(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux)
