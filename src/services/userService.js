import axios from '../axios'

const handleLoginAPI = (email, password) => {
    return axios.post('/api/login', { email, password })
}
const getAllUser = inpitId => {
    return axios.get(`/api/get-all-users?id=${inpitId}`)
}
const createNewUserService = data => {
    return axios.post(`/api/create-new-user`, data)
}
const deleteUserService = inpitId => {
    return axios.delete(`/api/delete-user`, {
        data: {
            id: inpitId,
        },
    })
}
const editUserService = data => {
    return axios.put(`/api/edit-user`, data)
}
const getAllCodeService = inputType => {
    return axios.get(`/api/allcode?type=${inputType}`)
}
const getTopDoctorHomeService = limit => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}
const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`)
}
const saveInfoDoctor = data => {
    return axios.post(`/api/save-info-doctor`, data)
}
const getDetailInforDoctor = id => {
    return axios.get(`/api/get-info-doctor?id=${id}`)
}
const saveBulkScheduleDoctor = data => {
    return axios.post(`/api/bulk-create-schedule`, data)
}
const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(
        `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
    )
}
const getExtraInforDoctorById = doctorId => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`)
}
const getProfileDoctorById = doctorId => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}
const postPatientBookAppiontment = data => {
    return axios.post(`/api/patient-book-appoinment`, data)
}
const postVerifyBookAppiontment = data => {
    return axios.post(`/api/verify-book-appoinment`, data)
}
const createSpeacialtyService = data => {
    return axios.post(`/api/create-new-specialty`, data)
}
const getAllSpecialtyService = () => {
    return axios.get(`/api/get-specialty`)
}
const getAllPatientForDoctor = data => {
    return axios.get(
        `/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`
    )
}
const postsendRemedy = data => {
    return axios.post(`/api/send-remedy`, data)
}
export {
    handleLoginAPI,
    getAllUser,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctors,
    saveInfoDoctor,
    getDetailInforDoctor,
    saveBulkScheduleDoctor,
    getScheduleDoctorByDate,
    getExtraInforDoctorById,
    getProfileDoctorById,
    postPatientBookAppiontment,
    postVerifyBookAppiontment,
    createSpeacialtyService,
    getAllSpecialtyService,
    getAllPatientForDoctor,
    postsendRemedy,
}
