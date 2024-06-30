import React, { Component } from 'react'
import { connect } from 'react-redux'
import HomeHeader from './HomeHeader'
import Specialty from './Section/Specialty'
import Facility from './Section/Facility'
import Doctor from './Section/Doctor'
import Handbook from './Section/Handbook'
import HomeFooter from './HomeFooter'
class HomePage extends Component {
    render() {
        var settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        }
        return (
            <div>
                <HomeHeader isShowBanner={true} />
                <Specialty settings={settings} />
                <Facility settings={settings} />
                <Doctor settings={settings} />
                <Handbook settings={settings} />
                <HomeFooter settings={settings} />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
