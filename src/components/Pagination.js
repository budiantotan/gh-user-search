import React from 'react';
import { css } from '@emotion/core';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchUsers } from '../hooks/searchHook';
import { setPage } from '../redux/actions';

const containerStyle = css`
  justify-content: center;
  display: flex;
`;

const buttonStyle = css`
  padding: 8px;
  margin: 12px;
  color: #fff;
  text-transform: uppercase;
  text-decoration: none;
  background: #ed3330;
  border-radius: 4px;
  border: none;
  &:disabled {
    background: #EEE;
  }
  &:focus,
  &:active {
    outline: 0;
  }
  &:hover:not(:disabled) {
    background: #434343;
  }
`

export default () => {
  const searchUsers = useSearchUsers();
  const dispatch = useDispatch();
  const { items, totalRow, currentPage, keyword } = useSelector(state => state.searchResult) || {};
  const lastPage = Math.floor((totalRow && totalRow / 30) || 0);

  // Handlers
  const handleSearch = (page) => {
    if (items && items[page]) {
      dispatch(setPage(page));
    } else {
      searchUsers(keyword, page);
    }
  }
  const handlePrevClick = () => {
    handleSearch(Math.max(currentPage - 1, 0));
  };
  const handleNextClick = () => {
    handleSearch(Math.min(currentPage + 1, lastPage));
  };

  if (!items || lastPage <= 0) {
    return null;
  }

  return (
    <div css={containerStyle}>
      <button css={buttonStyle} disabled={currentPage <= 1} onClick={handlePrevClick}>{'Prev'}</button>
      <button css={buttonStyle} disabled={currentPage >= lastPage} onClick={handleNextClick}>{'Next'}</button>
    </div>
  )
}
