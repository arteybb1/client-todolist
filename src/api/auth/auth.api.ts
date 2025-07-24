import axios from '../instance'

export const signIn = async (payload: { username: string; password: string }) => {
  try {
    const { data } = await axios.post(`/auth`, payload)
    return data.token
  } catch (error) {
    return Promise.reject(error)
  }
}

export const refreshToken = async (refresh_token: string) => {
  try {
    const { data } = await axios.post('/auth/refresh_token', { refresh_token })
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}
