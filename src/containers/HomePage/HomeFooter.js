import React, { Component } from 'react'
import { connect } from 'react-redux'
import './HomeFooter.scss'
import Slider from 'react-slick'
// Import css files
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

class HomeFooter extends Component {
    render() {
        return (
            <div className="home-footer">
                <div className="head"></div>
                <p>&copy;2024 NGUYỄN QUỐC VŨ</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter)
