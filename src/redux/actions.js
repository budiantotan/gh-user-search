export const addPopularList = (userList) => {
  return {
    type: 'ADD_POPULAR_LIST',
    userList,
  }
}

// SEARCH ACTIONS
export const setSearchResult = (result) => {
  return {
    type: 'SET_SEARCH_RESULT',
    items: result.items,
    hasNext: !result.incomplete_results,
  }
}

export const setSearchState = ({ isLoading, isError }) => {
  return {
    type: 'SET_SEARCH_STATE',
    isLoading,
    isError,
  }
}
// END SEARCH ACTIONS

export const addUser = (userInfo) => {
  return {
    type: 'ADD_USER',
    username: userInfo.login,
    userInfo,
  }
}
