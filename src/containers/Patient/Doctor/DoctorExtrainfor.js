import React, { Component } from 'react'
import { connect } from 'react-redux'
import './DoctorExtrainfor.scss'
import { LANGUAGES } from '../../../utils'
import { getExtraInforDoctorById } from '../../../services/userService'
import { FormattedMessage } from 'react-intl'
import NumberFormat from 'react-number-format'

class DoctorExtrainfor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {},
        }
    }
    async componentDidUpdate(prevProps) {
        if (this.propslanguage !== prevProps.language) {
        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let res = await getExtraInforDoctorById(this.props.doctorIdFromParent)

            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data,
                })
            }
        }
    }
    ShowDetailInfor = status => {
        this.setState({
            isShowDetailInfor: status,
        })
    }
    render() {
        let { isShowDetailInfor, extraInfor } = this.state

        let { language } = this.props

        return (
            <div className="doctor-extra-info-container">
                <div className="content-up">
                    <div className="text-address">
                        <FormattedMessage id="patient.extra-infor-doctor.text-address" />
                    </div>
                    <div className="name-clinic">
                        {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}
                    </div>
                    <div className="detail-address">
                        {extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}
                    </div>
                </div>
                <div className="content-down">
                    {isShowDetailInfor === false && (
                        <div className="short-infor">
                            <FormattedMessage id="patient.extra-infor-doctor.price" />

                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI && (
                                <NumberFormat
                                    className="currency"
                                    value={extraInfor.priceTypeData.valueVI}
                                    displayType={'text'}
                                    thousandsSeparator={true}
                                    suffix={'VNĐ'}
                                />
                            )}
                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN && (
                                <NumberFormat
                                    className="currency"
                                    value={extraInfor.priceTypeData.valueEN}
                                    displayType={'text'}
                                    thousandsSeparator={true}
                                    suffix={'$'}
                                />
                            )}
                            <span className="detail" onClick={() => this.ShowDetailInfor(true)}>
                                <FormattedMessage id="patient.extra-infor-doctor.detail" />
                            </span>
                        </div>
                    )}
                    {isShowDetailInfor === true && (
                        <>
                            <div className="title-price">
                                <FormattedMessage id="patient.extra-infor-doctor.price" />
                            </div>
                            <div className="detail-infor">
                                <div className="price">
                                    <span className="left">
                                        <FormattedMessage id="patient.extra-infor-doctor.price" />
                                    </span>
                                    <span className="right">
                                        {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI && (
                                            <NumberFormat
                                                className="currency"
                                                value={extraInfor.priceTypeData.valueVI}
                                                displayType={'text'}
                                                thousandsSeparator={true}
                                                suffix={'VNĐ'}
                                            />
                                        )}
                                        {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN && (
                                            <NumberFormat
                                                className="currency"
                                                value={extraInfor.priceTypeData.valueEN}
                                                displayType={'text'}
                                                thousandsSeparator={true}
                                                suffix={'$'}
                                            />
                                        )}
                                    </span>
                                </div>
                                <div className="note">
                                    <FormattedMessage id="patient.extra-infor-doctor.payment" />
                                </div>
                            </div>
                            <div className="payment">
                                {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.VI
                                    ? extraInfor.paymentTypeData.valueVI
                                    : ''}
                                {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.EN
                                    ? extraInfor.paymentTypeData.valueEN
                                    : ''}
                            </div>
                            <div className="hide-price">
                                <span onClick={() => this.ShowDetailInfor(false)}>
                                    <FormattedMessage id="patient.extra-infor-doctor.hide-price" />
                                </span>
                            </div>
                        </>
                    )}
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
export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtrainfor)
