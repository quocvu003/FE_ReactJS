import actionTypes from '../actions/actionTypes'

const initialState = {
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    allScheduleTime: [],
    allDoctorInfor: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        // Gender
        case actionTypes.FETCH_GENDER_START:
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.genders = []
            return {
                ...state,
            }
        // Position
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data

            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = []
            return {
                ...state,
            }
        // ROLE
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = []
            return {
                ...state,
            }

        // Get all user
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.users = action.data
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USER_FAILED:
            state.users = []
            return {
                ...state,
            }

        // Get top doctor
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.topDoctors = action.dataDoctors
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTOR_FAILED:
            state.topDoctors = []
            return {
                ...state,
            }
        // Get all doctor
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.allDoctors = action.dataDr

            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTOR_FAILED:
            state.allDoctors = []
            return {
                ...state,
            }
        ////
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.dataTime
            return {
                ...state,
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
            state.allScheduleTime = []
            return {
                ...state,
            }
        //
        case actionTypes.FETCH_DOCTOR_INFOR_SUCCESS:
            state.allDoctorInfor = action.data

            return {
                ...state,
            }
        case actionTypes.FETCH_DOCTOR_INFOR_FAILED:
            state.allDoctorInfor = []
            return {
                ...state,
            }

        default:
            return state
    }
}

export default adminReducer
