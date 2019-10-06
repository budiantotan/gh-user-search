import React from 'react';
import { useSelector } from 'react-redux';
import { css } from '@emotion/core';
import UserList from '../components/UserList';
import LoadSpinner from '../components/LoadSpinner';

const errorMessageStyle = css`
  padding: 24px;
  font-size: 26px;
  line-height: 1.5;
  text-align: center;
  font-weight: 700;
  color: dimgray;
`;

const loaderContainerStyle = css`
  display: flex;
  padding: 24px;
  justify-content: center;
`;

export default () => {
  const searchResultState = useSelector(state => state.searchResult);
  
  if (searchResultState.isLoading) {
    return (<div css={loaderContainerStyle}><LoadSpinner /></div>)
  }

  if (searchResultState.isError) {
    return (<div css={errorMessageStyle}>{'Opps, something bad happened. Please retry'}</div>)
  }

  const page = searchResultState.currentPage;
  return (
    <UserList userList={searchResultState.items && searchResultState.items[page]} />
  )
}
