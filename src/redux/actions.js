export const addPopularList = (userList) => {
  return {
    type: 'ADD_POPULAR_LIST',
    userList,
  }
}

export const addUser = (userInfo) => {
  return {
    type: 'ADD_USER',
    username: userInfo.login,
    userInfo,
  }
}
