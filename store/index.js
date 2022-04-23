export const state = () => ({
    user:{}
  })
  
export const mutations = {
    SET_USER: (state, user) => {
        state.user = user
      },
}
export const getters = {
    user: state => state.user
}
