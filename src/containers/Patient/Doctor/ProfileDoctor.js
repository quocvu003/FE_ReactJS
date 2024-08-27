import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import './ProfileDoctor.scss'
import { getProfileDoctorById } from '../../../services/userService'
import { LANGUAGES } from '../../../utils'
import NumberFormat from 'react-number-format'
import _ from 'lodash'
import moment from 'moment'
import localizaton from 'moment/locale/vi'
class ProfileDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataProfile: {},
        }
    }
    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId)
        this.setState({
            dataProfile: data,
        })
    }

    getInforDoctor = async id => {
        let result = {}
        if (id) {
            let res = await getProfileDoctorById(id)
            if (res && res.errCode === 0) {
                result = res.data
            }
        }
        return result
    }
    async componentDidUpdate(prevProps, nextProps) {
        if (this.props.doctorId !== prevProps.doctorId) {
            this.getInforDoctor(this.props.doctorId)
        }
    }
    dataTimeBooking = dataTime => {
        let { language } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {
            let time =
                language === LANGUAGES.VI
                    ? dataTime.timeTypeData.valueVI
                    : dataTime.timeTypeData.valueEN
            let date =
                language === LANGUAGES.VI
                    ? moment
                          .unix(+dataTime.date / 1000)
                          .format('dddd - DD/MM/YYYY')
                    : moment
                          .unix(+dataTime.date / 1000)
                          .locale('en')
                          .format('dddd - MM/DD/YYYY')
            return (
                <>
                    <div>
                        {time} | {date}
                    </div>
                </>
            )
        }
        return <></>
    }
    render() {
        let { dataProfile } = this.state
        let { language, isShowDescriptionDoctor, dataTime } = this.props
        let nameVi = '',
            nameEn = ''
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVI} ${dataProfile.lastName} ${dataProfile.firstName}`
            nameEn = `${dataProfile.positionData.valueEN} ${dataProfile.firstName} ${dataProfile.lastName}`
        }
        console.log(dataProfile)
        return (
            <div className="profile-doctor-container">
                <div className="intro-doctor">
                    <div
                        className="content-left"
                        style={{
                            backgroundImage: `url(${
                                dataProfile && dataProfile.image
                                    ? dataProfile.image
                                    : ''
                            }`,
                        }}></div>
                    <div className="content-right">
                        <div className="up">
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className="down">
                            {isShowDescriptionDoctor === true ? (
                                <>
                                    {dataProfile &&
                                        dataProfile.Markdown &&
                                        dataProfile.Markdown.description && (
                                            <span>
                                                {
                                                    dataProfile.Markdown
                                                        .description
                                                }
                                            </span>
                                        )}
                                </>
                            ) : (
                                <>{this.dataTimeBooking(dataTime)}</>
                            )}
                        </div>
                    </div>
                </div>
                <div className="price">
                    <FormattedMessage id="patient.booking-modal.price" />
                    {dataProfile &&
                        dataProfile.Doctor_Infor &&
                        language === LANGUAGES.VI && (
                            <NumberFormat
                                className="currency"
                                value={
                                    dataProfile.Doctor_Infor.priceTypeData
                                        .valueVI
                                }
                                displayType={'text'}
                                thousandsSeparator={true}
                                suffix={'VNĐ'}
                            />
                        )}
                    {dataProfile &&
                        dataProfile.Doctor_Infor &&
                        language === LANGUAGES.EN && (
                            <NumberFormat
                                className="currency"
                                value={
                                    dataProfile.Doctor_Infor.priceTypeData
                                        .valueEN
                                }
                                displayType={'text'}
                                thousandsSeparator={true}
                                suffix={'$'}
                            />
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
export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor)
