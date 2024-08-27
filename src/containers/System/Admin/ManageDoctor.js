import React, { Component } from 'react'
import { connect } from 'react-redux'
import './ManageDoctor.scss'
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import { FormattedMessage } from 'react-intl'
import 'react-markdown-editor-lite/lib/index.css'
import Select from 'react-select'
import { LANGUAGES } from '../../../utils'
import { CRUD_ACTIONS } from '../../../utils'
import { getDetailInforDoctor } from '../../../services/userService'

const mdParser = new MarkdownIt()

class ManageDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // Save to Markdown
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: null,
            description: '',
            listDoctors: [],

            // Save to doctor_infor
            listPrice: [],
            listPayment: [],
            listProvince: [],

            selectPrice: '',
            selectPayment: '',
            selectProvince: '',

            nameClinic: '',
            addressClinic: '',
            note: '',
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctors()
        this.props.getDoctorInfor()
    }

    buildataInputSelect = (inputData, type) => {
        let result = []
        let { language } = this.props
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map(item => {
                    let object = {}
                    let labelVi = `${item.lastName} ${item.firstName}`
                    let labelEn = `${item.firstName} ${item.lastName}`
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn
                    object.value = item.id
                    result.push(object)
                })
            }
            if (type === 'PRICE') {
                inputData.map(item => {
                    let object = {}
                    let labelVi = `${item.valueVI} VND`
                    let labelEn = `${item.valueEN} USD`
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn
                    object.value = item.keyMap
                    result.push(object)
                })
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map(item => {
                    let object = {}
                    let labelVi = `${item.valueVI}`
                    let labelEn = `${item.valueEN} `
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn
                    object.value = item.keyMap
                    result.push(object)
                })
            }
        }
        return result
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildataInputSelect(
                this.props.allDoctors,
                'USERS'
            )

            this.setState({
                listDoctors: dataSelect,
            })
        }

        if (prevProps.allDoctorInfor !== this.props.allDoctorInfor) {
            let { resPrice, resPayment, resProvince } =
                this.props.allDoctorInfor

            let dataselectPrice = this.buildataInputSelect(resPrice, 'PRICE')

            let dataselectPayment = this.buildataInputSelect(
                resPayment,
                'PAYMENT'
            )

            let dataselectProvince = this.buildataInputSelect(
                resProvince,
                'PROVINCE'
            )

            this.setState({
                listPrice: dataselectPrice,
                listPayment: dataselectPayment,
                listProvince: dataselectProvince,
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildataInputSelect(
                this.props.allDoctors,
                'USERS'
            )
            let { resPayment, resProvince, resPrice } =
                this.props.allDoctorInfor
            let dataselectPrice = this.buildataInputSelect(resPrice, 'PRICE')
            let dataselectPayment = this.buildataInputSelect(
                resPayment,
                'PAYMENT'
            )
            let dataselectProvince = this.buildataInputSelect(
                resProvince,
                'PROVINCE'
            )
            this.setState({
                listDoctors: dataSelect,
                listPrice: dataselectPrice,
                listPayment: dataselectPayment,
                listProvince: dataselectProvince,
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }
    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state
        this.props.saveInfoDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action:
                hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectPrice: this.state.selectPrice.value,
            selectPayment: this.state.selectPayment.value,
            selectProvince: this.state.selectProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
        })
    }
    handleChangeSelectDoctorInfor = (selectedOption, name) => {
        let stateName = name.name
        let stateCopy = { ...this.state }

        stateCopy[stateName] = selectedOption
        this.setState({
            ...stateCopy,
        })
    }

    handleChangeSelect = async selectedOption => {
        this.setState({ selectedOption })
        let { listPayment, listPrice, listProvince } = this.state
        let res = await getDetailInforDoctor(selectedOption.value)
        console.log('🚀 ~ ManageDoctor ~  res:', res)
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown
            let addressClinic = '',
                nameClinic = '',
                note = '',
                paymentId = '',
                priceId = '',
                provinceId = '',
                selectPayment = '',
                selectPrice = '',
                selectProvince = ''

            if (res.data.Doctor_Infor) {
                addressClinic = res.data.Doctor_Infor.addressClinic
                nameClinic = res.data.Doctor_Infor.nameClinic
                note = res.data.Doctor_Infor.note

                paymentId = res.data.Doctor_Infor.paymentId

                priceId = res.data.Doctor_Infor.priceId
                provinceId = res.data.Doctor_Infor.provinceId

                selectPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })

                selectPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })

                selectProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })
            }

            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectPayment: selectPayment,
                selectPrice: selectPrice,
                selectProvince: selectProvince,
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                addressClinic: '',
                nameClinic: '',
                note: '',
            })
        }
    }
    handleOnChangeText = (e, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = e.target.value
        this.setState({
            ...stateCopy,
        })
    }
    render() {
        console.log('🚀this.state', this.state)
        return (
            <div className="mange-doctor-container">
                <div className="mange-doctor-title">
                    <FormattedMessage id="admin.manage-doctor.title" />
                </div>
                <div className="more-info">
                    <div className="content-left form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.select-doctor" />
                        </label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder={
                                <FormattedMessage id="admin.manage-doctor.select-doctor" />
                            }
                        />
                    </div>
                    <div className="content-right form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.doctor-infor" />
                        </label>
                        <textarea
                            className="form-control"
                            rows="4"
                            onChange={e =>
                                this.handleOnChangeText(e, 'description')
                            }
                            value={this.state.description}></textarea>
                    </div>
                </div>
                <div className="more-info-extra row">
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.nameClinic" />
                        </label>
                        <input
                            className="form-control"
                            onChange={e =>
                                this.handleOnChangeText(e, 'nameClinic')
                            }
                            value={this.state.nameClinic}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.price" />
                        </label>
                        <Select
                            value={this.state.selectPrice}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPrice}
                            placeholder={
                                <FormattedMessage id="admin.manage-doctor.price" />
                            }
                            name="selectPrice"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.addressClinic" />
                        </label>
                        <input
                            className="form-control"
                            onChange={e =>
                                this.handleOnChangeText(e, 'addressClinic')
                            }
                            value={this.state.addressClinic}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.province" />
                        </label>
                        <Select
                            value={this.state.selectProvince}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listProvince}
                            placeholder={
                                <FormattedMessage id="admin.manage-doctor.province" />
                            }
                            name="selectProvince"
                        />
                    </div>

                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.payment" />
                        </label>
                        <Select
                            value={this.state.selectPayment}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPayment}
                            placeholder={
                                <FormattedMessage id="admin.manage-doctor.payment" />
                            }
                            name="selectPayment"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.note" />
                        </label>
                        <input
                            className="form-control"
                            onChange={e => this.handleOnChangeText(e, 'note')}
                            value={this.state.note}
                        />
                    </div>
                </div>
                <div className="mange-doctor-editor">
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <div className="mb-5 button-borders">
                    <button
                        className="primary-button"
                        onClick={() => this.handleSaveContentMarkdown()}>
                        <FormattedMessage id="admin.manage-doctor.save" />
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allDoctorInfor: state.admin.allDoctorInfor,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        getDoctorInfor: () => dispatch(actions.getDoctorInfor()),
        saveInfoDoctor: data => dispatch(actions.saveInfoDoctorRedux(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor)
