export const addPopularList = (userList) => ({
  type: 'ADD_POPULAR_LIST',
  userList,
})

// SEARCH ACTIONS
export const setSearchResult = (result, page) => ({
  type: 'SET_SEARCH_RESULT',
  page,
  totalRow: result.total_count,
  items: result.items,
  hasNext: !result.incomplete_results,
})

export const setKeyword = keyword => ({
  type: 'SET_SEARCH_KEYWORD',
  keyword,
})

export const setPage = page => ({
  type: 'SET_CURRENT_PAGE',
  page,
})

export const setSearchState = ({ isLoading, isError }) => ({
  type: 'SET_SEARCH_STATE',
  isLoading,
  isError,
})
// END SEARCH ACTIONS

// USER ACTIONS
export const addAllUserInfo = (userInfo, followers, following) => ({
  type: 'ADD_ALL_USER_INFO',
  username: userInfo.login,
  userInfo,
  followers,
  following,
})

export const addUserInfo = (userInfo) => ({
  type: 'ADD_USER_INFO',
  username: userInfo.login,
  userInfo,
})

export const addUserFollowers = (username, followers) => ({
  type: 'ADD_USER_FOLLOWERS',
  username,
  followers,
})

export const addUserFollowing = (username, following) => ({
  type: 'ADD_USER_FOLLOWING',
  username,
  following,
})
// END USER ACTIONS
