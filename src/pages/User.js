import React, { useState, useEffect } from 'react';
import { getUser } from '../services/Github';

export default (props) => {
  const {
    match: {
      params: {
        username = ''
      } = {}
    } = {}
  } = props;

  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    if (username) {
      const fetchUser = async () => {
        setUserInfo(await getUser(username));
      }
      fetchUser();
    }
  }, [username]);

  return (
    <pre>
      {JSON.stringify(userInfo, null, 2)}
    </pre>
  )
}
