import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Specialty.scss'
import Slider from 'react-slick'
import { getAllSpecialtyService } from '../../../services/userService'
// Import css files
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

class Specialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSpecalty: [],
        }
    }
    async componentDidMount() {
        let res = await getAllSpecialtyService()

        if (res && res.errCode === 0) {
            this.setState({ dataSpecalty: res.data ? res.data : [] })
        }
    }
    render() {
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        }
        let { dataSpecalty } = this.state
        return (
            <div>
                <div className="section-specialty">
                    <div className="specialty-container">
                        <div className="specialty-header">
                            <span className="title-section">
                                Chuyên khoa phổ biến
                            </span>
                            <button className="btn-section">Xem thêm</button>
                        </div>
                        <div className="specialty-body">
                            <Slider {...settings}>
                                {dataSpecalty &&
                                    dataSpecalty.length > 0 &&
                                    dataSpecalty.map((item, index) => {
                                        return (
                                            <div
                                                className="specialty-customize"
                                                key={index}>
                                                <div
                                                    className="bg-image"
                                                    style={{
                                                        backgroundImage: `url(${item.image})`,
                                                    }}></div>
                                                <div>{item.name}</div>
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
    }
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Specialty)
