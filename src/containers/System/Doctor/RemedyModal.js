import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap'
import './RemedyModal.scss'
import { toast } from 'react-toastify'
import moment from 'moment'
import { LANGUAGES, CommonUtils } from '../../../utils'

class RemedyModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            imgBase64: '',
        }
    }
    componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
            })
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
            })
        }
    }
    handleChangeEmail = e => {
        this.setState({
            email: e.target.value,
        })
    }
    handleFile = async e => {
        let file = e.target.files[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            this.setState({
                imgBase64: base64,
            })
        }
    }
    handleRemedy = () => {
        this.props.sendRemedy(this.state)
    }
    render() {
        let { isOpenModal, closeRemedyModal } = this.props

        return (
            <Modal
                isOpen={isOpenModal}
                className={'booking-modal-container'}
                size="lg"
                centered>
                <div class="modal-header">
                    <h5 class="modal-title">
                        Gui hoa don kham benh thanh cong
                    </h5>
                    <button
                        type="button"
                        class="close"
                        aria-label="Close"
                        onClick={closeRemedyModal}>
                        X
                    </button>
                </div>
                <ModalBody>
                    <div className="row ">
                        <div className="col-6 form-group">
                            <label>Email benh nhan</label>
                            <input
                                type="email"
                                className="form-control"
                                value={this.state.email}
                                onChange={e =>
                                    this.handleChangeEmail(e)
                                }></input>
                        </div>
                        <div className="col-6 form-group">
                            <label>File don thuoc</label>
                            <input
                                type="file"
                                className="form-control-file"
                                onChange={e => this.handleFile(e)}></input>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.handleRemedy()}>
                        Send
                    </Button>
                    <Button color="secondary" onClick={closeRemedyModal}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
}
const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    }
}

const mapDispatchToProps = dispatch => {
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal)
