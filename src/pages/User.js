import React from 'react';
import { useSelector } from 'react-redux';
import { addUser } from '../redux/actions';
import { getUser } from '../services/Github';

const User = (props) => {
  const {
    match: {
      params: {
        username = ''
      } = {}
    } = {}
  } = props;
  const userinfo = useSelector(state => state.userInfo && state.userInfo[username]);

  return (
    <pre>
      {JSON.stringify(userinfo, null, 2)}
    </pre>
  )
}

User.getInitialProps = async ({ store, params }) => {
  const { userInfo } = store.getState();
  if (!(userInfo && userInfo[params.username])) {
    try {
      const userInfo = await getUser(params.username);
      store.dispatch(addUser(userInfo));
    } catch (e) {
      console.log(e);
    }
  }
}

export default User;
