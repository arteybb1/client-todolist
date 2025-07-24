import axios from '../instance'
export const register = async (payload: { username: string; password: string }) => {
  try {
    const { data } = await axios.post(`/user/create`, payload)
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getProfile = async () => {
  try {
    const { data } = await axios.get(`/user/profile`)
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}
