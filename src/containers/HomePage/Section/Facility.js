import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Facility.scss'
import Slider from 'react-slick'
// Import css files
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

class Facility extends Component {
    render() {
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        }
        return (
            <div>
                <div className="section-facility">
                    <div className="facility-container">
                        <div className="facility-header">
                            <span className="title-section">Cơ sở y tế</span>
                            <button className="btn-section">Xem thêm</button>
                        </div>
                        <div className="facility-body">
                            <Slider {...settings}>
                                <div className="facility-customize">
                                    <div className="bg-image"></div>
                                    <div>Cơ sở y tế 1</div>
                                </div>
                                <div className="facility-customize">
                                    <div className="bg-image"></div>
                                    <div>Cơ sở y tế 2</div>
                                </div>
                                <div className="facility-customize">
                                    <div className="bg-image"></div>
                                    <div>Cơ sở y tế 3</div>
                                </div>
                                <div className="facility-customize">
                                    <div className="bg-image"></div>
                                    <div>Cơ sở y tế 4</div>
                                </div>
                                <div className="facility-customize">
                                    <div className="bg-image"></div>
                                    <div>Cơ sở y tế 5</div>
                                </div>
                                <div className="facility-customize">
                                    <div className="bg-image"></div>
                                    <div>Cơ sở y tế 6</div>
                                </div>
                                <div className="facility-customize">
                                    <div className="bg-image"></div>
                                    <div>Cơ sở y tế 7</div>
                                </div>
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
    }
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Facility)
