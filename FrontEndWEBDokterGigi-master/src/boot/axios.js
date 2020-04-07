import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://dettacare-event.pptik.id:5000'
  // baseURL: 'http://192.168.1.2:5000'
})

export default async ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance
}

export { axiosInstance }
