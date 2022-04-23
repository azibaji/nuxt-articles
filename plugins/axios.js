export default function ({ $axios }, inject) {
    const api = $axios.create({
      baseURL: process.env.API_URL || 'https://api.realworld.io/api'
    })
    inject('api', api)
  }
  