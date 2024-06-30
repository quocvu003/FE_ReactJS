import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Doctor.scss'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils'
import { FormattedMessage } from 'react-intl'
import { withRouter } from 'react-router'
class Doctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctors: [],
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux,
            })
        }
    }

    componentDidMount() {
        this.props.loadTopDoctors()
    }

    handleViewDetailDoctor = doctor => {
        if (this.props.history) {
            this.props.history.push(`/detail-doctor/${doctor.id}`)
        }
    }
    render() {
        let arrDoctors = this.state.arrDoctors
        console.log(arrDoctors)
        let { language } = this.props

        return (
            <div>
                <div className="section-doctor">
                    <div className="doctor-container">
                        <div className="doctor-header">
                            <span className="title-section">
                                <FormattedMessage id="home-page.doctor" />
                            </span>
                            <button className="btn-section">
                                <FormattedMessage id="home-page.more" />
                            </button>
                        </div>
                        <div className="doctor-body">
                            <Slider {...this.props.settings}>
                                {arrDoctors &&
                                    arrDoctors.length > 0 &&
                                    arrDoctors.map((item, index) => {
                                        let imageBase64 = ''
                                        if (item.image) {
                                            imageBase64 = new Buffer(item.image, 'base64').toString(
                                                'binary'
                                            )
                                        }
                                        let nameVi = `${item.positionData.valueVI}, ${item.lastName} ${item.firstName} `
                                        let nameEn = `${item.positionData.valueEN}, ${item.lastName} ${item.firstName} `
                                        return (
                                            <div
                                                className="doctor-customize"
                                                key={index}
                                                onClick={() => this.handleViewDetailDoctor(item)}>
                                                <div
                                                    className="bg-image"
                                                    style={{
                                                        backgroundImage: `url(${imageBase64})`,
                                                    }}></div>
                                                <div>
                                                    {language === LANGUAGES.VI ? nameVi : nameEn}
                                                </div>
                                                <div>Chuyên khoa 1</div>
                                            </div>
                                        )
                                    })}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,

        topDoctorsRedux: state.admin.topDoctors,
        language: state.app.language,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctor))
