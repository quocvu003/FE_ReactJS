import React, { Component } from 'react'
import { connect } from 'react-redux'
import './DoctorExtrainfor.scss'
class DoctorExtrainfor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowDetailInfor: false,
        }
    }
    async componentDidUpdate(prevProps) {
        if (this.propslanguage !== prevProps.language) {
        }
    }
    ShowDetailInfor = status => {
        this.setState({
            isShowDetailInfor: status,
        })
    }
    render() {
        let { isShowDetailInfor } = this.state
        return (
            <div className="doctor-extra-info-container">
                <div className="content-up">
                    <div className="text-address">ĐỊA CHỈ PHÒNG KHÁM</div>
                    <div className="name-clinic">Phòng khám Chuyên khoa Da Liễu</div>
                    <div className="detail-address">Quảng Nam</div>
                </div>
                <div className="content-down">
                    {isShowDetailInfor === false && (
                        <div className="short-infor">
                            GIÁ KHÁM: 250.000Đ
                            <span onClick={() => this.ShowDetailInfor(true)}>xem chi tiết</span>
                        </div>
                    )}
                    {isShowDetailInfor === true && (
                        <>
                            <div className="title-price">Gia kham</div>
                            <div className="detail-infor">
                                <div className="price">
                                    <span className="left">Gia kham</span>
                                    <span className="right">250.000D</span>
                                </div>
                                <div className="note">note</div>
                            </div>
                            <div className="payment">thanh toan bang the hoac tien mat</div>
                            <div className="hide-price">
                                <span onClick={() => this.ShowDetailInfor(false)}>An bang gia</span>
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
