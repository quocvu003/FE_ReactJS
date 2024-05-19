import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Specialty.scss'
import Slider from 'react-slick'
// Import css files
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

class Specialty extends Component {
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
                <div className="section-specialty">
                    <div className="specialty-container">
                        <div className="specialty-header">
                            <span className="title-section">Chuyên khoa phổ biến</span>
                            <button className="btn-section">Xem thêm</button>
                        </div>
                        <div className="specialty-body">
                            <Slider {...settings}>
                                <div className="specialty-customize">
                                    <div className="bg-image"></div>
                                    <div>Khoa 1</div>
                                </div>
                                <div className="specialty-customize">
                                    <div className="bg-image"></div>
                                    <div>Khoa 2</div>
                                </div>
                                <div className="specialty-customize">
                                    <div className="bg-image"></div>
                                    <div>Khoa 3</div>
                                </div>
                                <div className="specialty-customize">
                                    <div className="bg-image"></div>
                                    <div>Khoa 4</div>
                                </div>
                                <div className="specialty-customize">
                                    <div className="bg-image"></div>
                                    <div>Khoa 5</div>
                                </div>
                                <div className="specialty-customize">
                                    <div className="bg-image"></div>
                                    <div>Khoa 6</div>
                                </div>
                                <div className="specialty-customize">
                                    <div className="bg-image"></div>
                                    <div>Khoa 7</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty)
