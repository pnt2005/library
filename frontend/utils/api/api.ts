import axios from 'axios'
import Cookies from 'js-cookie'
import { toast } from 'react-hot-toast'

export const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
})

// Các endpoint public không cần gửi token
const PUBLIC_ENDPOINTS = [
  { method: 'GET', path: /^\/books/ },
  { method: 'POST', path: /^\/auth\// },
  { method: 'GET', path: /^\/cart/ },
]

api.interceptors.request.use((config) => {
  const token = Cookies.get('access_token')

  // Check nếu request nằm trong public endpoints thì bỏ qua attach token
  const isPublic = PUBLIC_ENDPOINTS.some(
    (rule) =>
      rule.method === config.method?.toUpperCase() &&
      rule.path.test(config.url || '')
  )

  if (!isPublic && token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const refreshToken = Cookies.get('refresh_token')
      if (!refreshToken) {
        return Promise.reject(error)
      }

      try {
        const res = await axios.post('http://localhost:8080/auth/refresh', {}, {
          headers: {
            Authorization: `Bearer ${refreshToken}`
          }
        })

        const newAccessToken = res.data.access_token
        Cookies.set('access_token', newAccessToken)

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return axios(originalRequest)

      } catch (refreshError) {
        toast.error('Your session has expired. Please log in again.')
        Cookies.remove('access_token')
        Cookies.remove('refresh_token')
        setTimeout(() => {
          window.location.href = '/login'
        }, 2000)
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)
