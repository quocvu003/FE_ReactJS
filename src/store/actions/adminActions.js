import actionTypes from './actionTypes'
import {
    getAllCodeService,
    createNewUserService,
    getAllUser,
    deleteUserService,
    editUserService,
    getTopDoctorHomeService,
    getAllDoctors,
    saveInfoDoctor,
} from '../../services/userService'

import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'
// Gender
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('GENDER')

            if (res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            }
        } catch (e) {
            dispatch(fetchGenderFailed())
            console.log('fetchGenderStart', e)
        }
    }
}

export const fetchGenderSuccess = genderData => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
})

// Position
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('POSITION')

            if (res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            }
        } catch (e) {
            dispatch(fetchPositionFailed())
            console.log('fetchPositionStart', e)
        }
    }
}

export const fetchPositionSuccess = positionData => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData,
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
})

// Role
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('ROLE')

            if (res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            }
        } catch (e) {
            dispatch(fetchRoleFailed())
            console.log('fetchRoleStart', e)
        }
    }
}

export const fetchRoleSuccess = roleData => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData,
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
})

// Create new user

export const createNewUser = data => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data)

            if (res.errCode === 0) {
                dispatch(SaveUserSuccess(res.data))

                toast.success('🦄 User created successfully!')
            }
        } catch (e) {
            toast.error('🦄 User created error!')
            dispatch(SaveUserFailed())
            console.log('createNewUser', e)
        }
    }
}

export const SaveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})

export const SaveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED,
})

// Get all users

export const fetchAllUser = () => {
    return async (dispatch, fetchState) => {
        try {
            let res = await getAllUser('ALL')

            if (res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()))
            }
        } catch (e) {
            dispatch(fetchAllUserFailed())
            console.log('fetchAllUser', e)
        }
    }
}

export const fetchAllUserSuccess = users => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    data: users,
})

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED,
})

// Delete a user

export const DeleteUser = id => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(id)

            if (res.errCode === 0) {
                dispatch(DeleteUserSuccess())
                dispatch(fetchAllUser())
                toast.success('🦄 User Deleted successfully!')
            }
        } catch (e) {
            dispatch(DeleteUserFailed())
            toast.error('🦄 User Deleted error!')
            console.log('DeleteUser', e)
        }
    }
}

export const DeleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})

export const DeleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
})

// Eidt  user

export const EditUser = data => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data)

            if (res.errCode === 0) {
                dispatch(EditUserSuccess())
                dispatch(fetchAllUser())
                toast.success('🦄 User Edited successfully!')
            }
        } catch (e) {
            dispatch(EditUserFailed())
            toast.error('🦄 User Edited error!')
            console.log('EditUser', e)
        }
    }
}

export const EditUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})

export const EditUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED,
})

// Get Top Doctor

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('')

            if (res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    dataDoctors: res.data,
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
                })
            }
        } catch (e) {
            console.log('Get Top Doctor', e)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
            })
        }
    }
}

// Get All Doctor

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors('')

            if (res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    dataDr: res.data,
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
                })
            }
        } catch (e) {
            console.log('Get ALL Doctor', e)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
            })
        }
    }
}
export const saveInfoDoctorRedux = data => {
    return async (dispatch, getState) => {
        try {
            let res = await saveInfoDoctor(data)

            if (res.errCode === 0) {
                toast.success('🦄 Save info doctor successfully!')
                dispatch({
                    type: actionTypes.SAVE_INFO_DOCTOR_SUCCESS,
                })
            } else {
                toast.error('🦄  Save info doctor error!')
                dispatch({
                    type: actionTypes.SAVE_INFO_DOCTOR_FAILED,
                })
            }
        } catch (e) {
            toast.error('🦄  Save info doctor error!')

            dispatch({
                type: actionTypes.SAVE_INFO_DOCTOR_FAILED,
            })
        }
    }
}
export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('TIME')

            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data,
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
                })
            }
        } catch (e) {
            console.log(e)
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
            })
        }
    }
}
// getDoctorPrice
export const getDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_DOCTOR_INFOR_START })

            let resPrice = await getAllCodeService('PRICE')
            let resPayment = await getAllCodeService('PAYMENT')
            let resProvince = await getAllCodeService('PROVINCE')

            if (
                resPrice &&
                resPrice.errCode === 0 &&
                resPayment &&
                resPayment.errCode === 0 &&
                resProvince &&
                resProvince.errCode === 0
            ) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                }
                dispatch(fetchDoctorInforSuccess(data))
            } else {
                dispatch(fetchDoctorInforFailed())
            }
        } catch (e) {
            dispatch(fetchDoctorInforFailed())
            console.log('fetchDoctorInforFailed', e)
        }
    }
}

export const fetchDoctorInforSuccess = data => ({
    type: actionTypes.FETCH_DOCTOR_INFOR_SUCCESS,
    data: data,
})

export const fetchDoctorInforFailed = () => ({
    type: actionTypes.FETCH_DOCTOR_INFOR_FAILED,
})
