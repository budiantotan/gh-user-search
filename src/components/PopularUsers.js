import React from 'react';
import UserCard from './UserCard';

export default (props) => {
  const { popularUsers } = props;
  return (
    <div>
      {popularUsers && popularUsers.items && popularUsers.items.map(user => (
        <UserCard key={user.id} userName={user.login} />
      ))}
    </div>
  )
}
