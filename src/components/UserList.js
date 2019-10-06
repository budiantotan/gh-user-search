import React from 'react';
import UserCard from './UserCard';
import { css } from '@emotion/core';

const containerStyle = css`
  display: flex;
  flex-direction: column;
  @media (min-width: 480px) {
    flex-flow: wrap;
  }
`;

export default (props) => {
  const { userList } = props;
  return (
    <div css={containerStyle}>
      {userList && userList.map(user => (
        <UserCard
          key={user.id}
          avatar={user.avatar_url}
          userName={user.login}
        />
      ))}
    </div>
  )
}
