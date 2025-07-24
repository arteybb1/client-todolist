import axios from '../instance'

export const signIn = async (payload: { username: string; password: string }) => {
  try {
    const { data } = await axios.post(`/auth`, payload)
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}
