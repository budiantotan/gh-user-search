import React, { useEffect, useState } from 'react';
import { getPopularUsers } from '../services/Github';
import UserCard from './UserCard';

export default () => {
  const [popularUsers, setPopularUsers] = useState()
  useEffect(() => {
    const fetchPopularUser = async () => {
      setPopularUsers(await getPopularUsers());
    }
    fetchPopularUser();
  }, []);

  return (
    <div>
      {popularUsers && popularUsers.items && popularUsers.items.map(user => (
        <UserCard key={user.id} userName={user.login} />
      ))}
    </div>
  )
}
