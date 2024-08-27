import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { postVerifyBookAppiontment } from '../../services/userService'
import HomeHeader from '../HomePage/HomeHeader'
import './VerifyEmail.scss'

class VerifyEmail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            statusVerify: false,
            errCode: {},
        }
    }
    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search)

            let tokenOld = urlParams.get('token')
            let tokenNew = tokenOld.replace('}', '')
            console.log(
                '🚀 ~ VerifyEmail ~ componentDidMount ~ tokenNew:',
                tokenNew
            )
            let doctorIdOld = urlParams.get('doctorId')
            let doctorIdCNew = doctorIdOld.split(' ')[0]
            let res = await postVerifyBookAppiontment({
                token: tokenNew,
                doctorId: doctorIdCNew,
            })
            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode,
                })
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1,
                })
            }
        }
    }
    render() {
        let { statusVerify, errCode } = this.state
        console.log('🚀 ~ render ~ errCode:', errCode)
        console.log('🚀 ~ render ~ statusVerify:', statusVerify)
        return (
            <>
                <HomeHeader />
                <div className="verify-email-container">
                    {statusVerify === false ? (
                        <div>loading...</div>
                    ) : (
                        <div>
                            {+errCode === 0 ? (
                                <div className="infor-booking">
                                    Xác nhận lịch hẹn thành công
                                </div>
                            ) : (
                                <div className="infor-booking">
                                    Lịch hẹn không tồn tại hoặc đã được xác nhận
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </>
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
export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail)
