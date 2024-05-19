import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Handbook.scss'
import Slider from 'react-slick'
// Import css files
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

class Handbook extends Component {
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
                <div className="section-handbook">
                    <div className="handbook-container">
                        <div className="handbook-header">
                            <span className="title-section">Cẩm nang</span>
                            <button className="btn-section">Xem thêm</button>
                        </div>
                        <div className="handbook-body">
                            <Slider {...settings}>
                                <div className="handbook-customize">
                                    <div className="bg-image"></div>
                                    <div>Cẩm nang 1</div>
                                </div>
                                <div className="handbook-customize">
                                    <div className="bg-image"></div>
                                    <div>Cẩm nang 2</div>
                                </div>
                                <div className="handbook-customize">
                                    <div className="bg-image"></div>
                                    <div>Cẩm nang 3</div>
                                </div>
                                <div className="handbook-customize">
                                    <div className="bg-image"></div>
                                    <div>Cẩm nang 4</div>
                                </div>
                                <div className="handbook-customize">
                                    <div className="bg-image"></div>
                                    <div>Cẩm nang 5</div>
                                </div>
                                <div className="handbook-customize">
                                    <div className="bg-image"></div>
                                    <div>Cẩm nang 6</div>
                                </div>
                                <div className="handbook-customize">
                                    <div className="bg-image"></div>
                                    <div>Cẩm nang 7</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Handbook)
