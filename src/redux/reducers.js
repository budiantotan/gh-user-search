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

export default combineReducers({ userInfo, popularList })
