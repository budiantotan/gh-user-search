import React, { useState } from 'react';
import { searchUser } from '../services/Github';

export default () => {
  const [keyword, setKeyword] = useState('');
  const handleBlur = (e) => {
    setKeyword(e.target.value);
  }
  const handleClick = async () => {
    const result = await searchUser(keyword);
    console.log(result);
  };

  return (
    <div>
      <input placeholder={'Search for user'} onBlur={handleBlur} />
      <button onClick={handleClick}>{'Search'}</button>
    </div>
  )
}
