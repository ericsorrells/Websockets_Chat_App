export const login = (userInfo) => {
  return {
    type: 'LOGIN',
    userInfo
  }
}