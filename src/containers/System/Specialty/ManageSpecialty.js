import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import './ManageSpecialty.scss'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils'
import { createSpeacialtyService } from '../../../services/userService'
import { toast } from 'react-toastify'

const mdParser = new MarkdownIt()
class ManageSpecialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
        }
    }
    handleOnchangeInput = (e, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = e.target.value
        this.setState({
            ...stateCopy,
        })
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html,
        })
    }
    handleImage = async e => {
        let file = e.target.files[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            this.setState({
                imageBase64: base64,
            })
        }
    }
    handleSave = async () => {
        let res = await createSpeacialtyService(this.state)
        if (res && res.errCode === 0) {
            toast.success('Add new Speacialty successfully')
        } else {
            toast.error('Add new Speacialty failed')
        }
    }
    render() {
        return (
            <div className="manage-specialty-container">
                <div className="ms-title">chuyen khoa</div>
                <div className="btn-add-new-specialty row">
                    <div className="col-6 form-group">
                        <label>ten chuyen khoa</label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.name}
                            onChange={e => this.handleOnchangeInput(e, 'name')}
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label>anh chuyen khoa</label>
                        <input
                            type="file"
                            className="form-control-file"
                            onChange={e => this.handleImage(e)}
                        />
                    </div>

                    <div className="col-12">
                        <MdEditor
                            style={{ height: '300px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className="col-12">
                        <button
                            className="btn-save-specialty"
                            onClick={() => this.handleSave()}>
                            SAVE
                        </button>
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
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty)
