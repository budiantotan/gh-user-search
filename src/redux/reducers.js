import { combineReducers } from "redux";
import produce from 'immer';

const popularList = (state = {}, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case 'ADD_POPULAR_LIST':
        draft.items = action.userList;
        break
    }
  })
}

const initialSearchResult = {
  isLoading: false,
  isError: false,
  keyword: '',
  currentPage: null,
  totalRow: null,
  items: {},
  hasNext: null
}

const searchResult = (state = initialSearchResult, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case 'SET_SEARCH_STATE':
        draft.isLoading = action.isLoading;
        draft.isError = action.isError;
        break;
      case 'SET_SEARCH_KEYWORD':
        draft.keyword = action.keyword;
        break;
      case 'SET_CURRENT_PAGE':
        draft.currentPage = action.page;
        break;
      case 'SET_SEARCH_RESULT':
        draft.isLoading = false;
        draft.isError = false;
        draft.currentPage = action.page;
        draft.totalRow = action.totalRow;
        draft.items[action.page] = action.items;
        draft.hasNext = action.hasNext;
        break;
    }
  })
}

const userInfo = (state = {}, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case 'ADD_ALL_USER_INFO':
        draft[action.username] = {
          userInfo: action.userInfo,
          followers: action.followers,
          following: action.following,
        }
        break;
      case 'ADD_USER_INFO':
        if (draft[action.username]) {
          draft[action.username].userInfo = action.userInfo
        } else {
          draft[action.username] = {
            userInfo: action.userInfo
          }
        }
        break
      case 'ADD_USER_FOLLOWERS':
        if (draft[action.username]) {
          draft[action.username].followers = action.followers
        } else {
          draft[action.username] = {
            followers: action.followers
          }
        }
        break
      case 'ADD_USER_FOLLOWING':
        if (draft[action.username]) {
          draft[action.username].following = action.following
        } else {
          draft[action.username] = {
            following: action.following
          }
        }
        break
    }
  })
}

export default combineReducers({ userInfo, popularList, searchResult })
