import React from 'react';
import { useSelector } from 'react-redux';
import { css } from '@emotion/core';
import { addAllUserInfo } from '../redux/actions';
import { getUser, getUserFollower, getUserFollowing } from '../services/Github';
import UserList from '../components/UserList';

const textStyle = css`
  padding: 12px;
  font-size: 18px;
  line-height: 1.5;
  text-align: center;
  font-weight: 700;
  color: dimgray;
`;

const preStyle = css`
  background: #fff;
  box-shadow: 2px 6px 25px rgba(0, 0, 0, 0.1);
  padding: 8px;
`;

const User = (props) => {
  const {
    match: {
      params: {
        username = ''
      } = {}
    } = {}
  } = props;
  const { userInfo, followers, following } = useSelector(state => state.userInfo && state.userInfo[username]) || {};

  return (
    <React.Fragment>
      <div css={textStyle}>{`Github user: ${username}`}</div>
      <pre css={preStyle}>
        {JSON.stringify(userInfo, null, 2)}
      </pre>
      <div css={textStyle}>{'Followers: '}</div>
      <UserList userList={followers} />
      <div css={textStyle}>{'Following: '}</div>
      <UserList userList={following} />
    </React.Fragment>
  )
}

User.getInitialProps = async ({ store, params }) => {
  const { userInfo } = store.getState();
  if (!(userInfo && userInfo[params.username])) {
    try {
      const [userInfo, follower, following] = await Promise.all([
        getUser(params.username),
        getUserFollower(params.username),
        getUserFollowing(params.username),
      ])
      store.dispatch(addAllUserInfo(userInfo, follower, following));
    } catch (e) {
      console.log(e);
    }
  }
}

export default User;
