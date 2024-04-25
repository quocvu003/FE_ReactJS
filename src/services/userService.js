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
export { handleLoginAPI, getAllUser, createNewUserService, deleteUserService, editUserService }
