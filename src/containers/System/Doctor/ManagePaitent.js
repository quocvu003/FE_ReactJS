import React, { Component } from 'react'
import { connect } from 'react-redux'
import DatePicker from '../../../components/Input/DatePicker'
import './ManagePaitent.scss'
import {
    getAllPatientForDoctor,
    postsendRemedy,
} from '../../../services/userService'
import moment from 'moment'
import { LANGUAGES } from '../../../utils'
import RemedyModal from './RemedyModal'
import { toast } from 'react-toastify'

class ManagePaitent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpen: false,
            dataModal: {},
        }
    }
    async componentDidMount() {
        this.getDataPatient()
    }
    getDataPatient = async () => {
        let { user } = this.props
        let { currentDate } = this.state
        let formattedData = new Date(currentDate).getTime()

        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formattedData,
        })

        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data,
            })
        }
    }
    async componentDidUpdate(prevProps) {
        if (this.props.language !== prevProps.language) {
            this.setState({})
        }
    }
    handleOnchangeDatePicker = date => {
        this.setState(
            {
                currentDate: date[0],
            },
            async () => {
                await this.getDataPatient()
            }
        )
    }
    handleBtnConfirm = item => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName,
        }
        this.setState({
            isOpen: true,
            dataModal: data,
        })
    }
    closeRemedyModal = () => {
        this.setState({
            isOpen: false,
            dataModal: {},
        })
    }
    sendRemedy = async dataChildModal => {
        let { dataModal } = this.state
        let res = await postsendRemedy({
            email: dataChildModal.email,
            imgBase64: dataChildModal.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName,
        })
        if (res && res.errCode === 0) {
            toast.success('Send Remedy successfully')
            this.closeRemedyModal()
            await this.getDataPatient()
        } else {
            toast.error('Send Remedy failed')
        }
    }
    render() {
        let { dataPatient, isOpen, dataModal } = this.state

        let { language } = this.props

        return (
            <>
                <div className="manage-paitent-container">
                    <div className="m-p-title">Manage Paitent</div>
                    <div className="manage-paitent-body row">
                        <div className="col-4 form-group">
                            <label>Chon ngay kham</label>
                            <DatePicker
                                onChange={this.handleOnchangeDatePicker}
                                className="form-control"
                                value={this.state.currentDate}
                            />
                        </div>
                        <div className="col-12 table-manage-patient">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>STT</th>
                                        <th>Thoi Gian</th>
                                        <th>Ho va Ten</th>
                                        <th>Dia Chi</th>
                                        <th>Gioi Tinh</th>
                                        <th>Actions</th>
                                    </tr>
                                    {dataPatient && dataPatient.length > 0 ? (
                                        dataPatient.map((item, index) => {
                                            let time =
                                                language === LANGUAGES.VI
                                                    ? item.timeTypeDataPatient
                                                          .valueVI
                                                    : item.timeTypeDataPatient
                                                          .valueEN
                                            let gender =
                                                language === LANGUAGES.VI
                                                    ? item.patientData
                                                          .genderData.valueVI
                                                    : item.patientData
                                                          .genderData.valueEN
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{time}</td>
                                                    <td>
                                                        {
                                                            item.patientData
                                                                .firstName
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            item.patientData
                                                                .address
                                                        }
                                                    </td>
                                                    <td>{gender}</td>
                                                    <td>
                                                        <button
                                                            className="mp-btn-confirm"
                                                            onClick={() =>
                                                                this.handleBtnConfirm(
                                                                    item
                                                                )
                                                            }>
                                                            Xac nhan
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    ) : (
                                        <tr>No data</tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <RemedyModal
                    isOpenModal={isOpen}
                    dataModal={dataModal}
                    closeRemedyModal={this.closeRemedyModal}
                    sendRemedy={this.sendRemedy}
                />
            </>
        )
    }
}
const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    }
}

const mapDispatchToProps = dispatch => {
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(ManagePaitent)
