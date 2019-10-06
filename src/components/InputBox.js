import React, { useState } from 'react';
import { css } from '@emotion/core';
import { useDispatch } from 'react-redux';
import { useSearchUsers } from '../hooks/searchHook';
import { setKeyword as setSearchKeyword } from '../redux/actions';

const containerStyle = css`
  margin: 12px;
  display: flex;
`;

const inputStyle = css`
  box-shadow: 2px 6px 25px rgba(0,0,0,0.1);
  padding: 12px;
  border-radius: 4px;
  font-size: 12px;
  border: none;
  flex-grow: 1;
  margin-right: 4px;
  &:focus,
  &:active {
    outline: 0;
  }
`;

const buttonStyle = css`
  color: #fff;
  text-transform: uppercase;
  text-decoration: none;
  background: #ed3330;
  border-radius: 4px;
  border: none;
  &:focus,
  &:active {
    outline: 0;
  }
  &:hover {
    background: #434343;
  }
`

export default () => {
  const dispatch = useDispatch();
  const searchUsers = useSearchUsers();
  const [keyword, setKeyword] = useState('');

  const handleChange = (e) => {
    setKeyword(e.target.value);
  }
  const handleClick = () => {
    if (keyword) {
      dispatch(setSearchKeyword(keyword));
      searchUsers(keyword);
    }
  };

  return (
    <div css={containerStyle}>
      <input css={inputStyle} placeholder={'Search for user'} onChange={handleChange} />
      <button css={buttonStyle} onClick={handleClick}>{'Search'}</button>
    </div>
  )
}
