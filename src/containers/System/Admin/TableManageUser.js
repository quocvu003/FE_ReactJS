import React, { Component } from 'react'
import { connect } from 'react-redux'
import './TableManageUser.scss'
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
// import style manually
import 'react-markdown-editor-lite/lib/index.css'

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */)

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text)
}

class TableManageUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usersArr: [],
        }
    }
    componentDidMount() {
        this.props.fetchAllUser()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.userRedux !== this.props.userRedux) {
            this.setState({
                usersArr: this.props.userRedux,
            })
        }
    }
    handleEditUser = user => {
        this.props.handleEditUserParent(user)
    }
    handleDeleteUser = user => {
        this.props.DeleteUser(user.id)
    }

    render() {
        console.log('check', this.state.usersArr)
        return (
            <React.Fragment>
                <table id="TableManageUser">
                    <tr>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>

                    {this.state.usersArr &&
                        this.state.usersArr.map((item, index) => {
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
                <MdEditor
                    style={{ height: '500px' }}
                    renderHTML={text => mdParser.render(text)}
                    onChange={handleEditorChange}
                />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        userRedux: state.admin.users,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUser: () => dispatch(actions.fetchAllUser()),
        DeleteUser: id => dispatch(actions.DeleteUser(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser)
