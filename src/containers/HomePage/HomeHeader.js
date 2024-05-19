import React, { Component } from 'react'
import { connect } from 'react-redux'
import './HomeHeader.scss'
import { FormattedMessage } from 'react-intl'
import { LANGUAGES } from '../../utils'
import { changeLanguageApp } from '../../store/actions'

class HomeHeader extends Component {
    changeLanguage = language => {
        this.props.changeLanguageRedux(language)
    }

    render() {
        let language = this.props.language

        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fas fa-bars"></i>
                            <div className="header-logo"></div>
                        </div>
                        <div className="center-content">
                            <div className="child-center">
                                <div>
                                    <b>
                                        <FormattedMessage id="home-header.specialty" />
                                    </b>
                                </div>
                                <div className="sub-title">
                                    <FormattedMessage id="home-header.find-doctors-by-specialty" />
                                </div>
                            </div>
                            <div className="child-center">
                                <div>
                                    <b>
                                        <FormattedMessage id="home-header.healthcare-facility" />
                                    </b>
                                </div>
                                <div className="sub-title">
                                    <FormattedMessage id="home-header.choose-a-medical-clinic" />
                                </div>
                            </div>
                            <div className="child-center">
                                <div>
                                    <b>
                                        <FormattedMessage id="home-header.doctor" />
                                    </b>
                                </div>
                                <div className="sub-title">
                                    <FormattedMessage id="home-header.choose-a-skilled-doctor" />
                                </div>
                            </div>
                            <div className="child-center">
                                <div>
                                    <b>
                                        <FormattedMessage id="home-header.health-checkup-package" />
                                    </b>
                                </div>
                                <div className="sub-title">
                                    <FormattedMessage id="home-header.general-health-checkup-package" />
                                </div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support">
                                <i className="far fa-question-circle"></i>{' '}
                                <FormattedMessage id="home-header.support" />
                            </div>

                            <div className="language">
                                <div
                                    className={
                                        language === LANGUAGES.VI
                                            ? 'language-vi active'
                                            : 'language-vi'
                                    }>
                                    <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                                        VI
                                    </span>
                                </div>
                                <div
                                    className={
                                        language === LANGUAGES.EN
                                            ? 'language-en active'
                                            : 'language-en'
                                    }>
                                    <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                                        EN
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="home-header-banner">
                    <div className="banner-up">
                        <div className="title1">
                            <FormattedMessage id="home-header.healthcare-platform" />
                        </div>
                        <div className="title2">
                            <FormattedMessage id="home-header.comprehensive-care" />
                        </div>
                        <div className="search">
                            <i className="fas fa-search"></i>
                            <input type="text"></input>
                        </div>
                    </div>
                    <div className="banner-down">
                        <div className="option">
                            <div className="option-child">
                                <div className="icon-child">
                                    <i class="fas fa-hospital"></i>
                                </div>
                                <div className="text-child">
                                    {' '}
                                    <FormattedMessage id="home-header.specialty-checkup" />
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <i class="fas fa-mobile-alt"></i>
                                </div>
                                <div className="text-child">
                                    {' '}
                                    <FormattedMessage id="home-header.remote-checkup" />
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <i class="fas fa-infinity"></i>
                                </div>
                                <div className="text-child">
                                    {' '}
                                    <FormattedMessage id="home-header.general-checkup" />
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <i class="fas fa-flask"></i>
                                </div>
                                <div className="text-child">
                                    {' '}
                                    <FormattedMessage id="home-header.educational-testing" />
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <i class="fas fa-user-md"></i>
                                </div>
                                <div className="text-child">
                                    {' '}
                                    <FormattedMessage id="home-header.mental-health" />
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <i class="fas fa-smile"></i>
                                </div>
                                <div className="text-child">
                                    {' '}
                                    <FormattedMessage id="home-header.dental-checkup" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageRedux: language => dispatch(changeLanguageApp(language)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
