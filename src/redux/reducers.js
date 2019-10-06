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

const searchResult = (state = {}, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case 'SET_SEARCH_STATE':
        draft.isLoading = action.isLoading;
        draft.isError = action.isError;
        break;
      case 'SET_SEARCH_RESULT':
        draft.isLoading = false;
        draft.isError = false;
        draft.items = action.items;
        draft.hasNext = action.hasNext;
        break
    }
  })
}

const userInfo = (state = {}, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case 'ADD_USER':
        draft[action.username] = {
          userInfo: action.userInfo
        }
        break
    }
  })
}

export default combineReducers({ userInfo, popularList, searchResult })
