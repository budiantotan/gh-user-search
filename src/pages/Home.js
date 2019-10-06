import React from 'react';
import InputBox from '../components/InputBox';
import Pagination from '../components/Pagination';
import SearchResult from '../components/SearchResult';

const Home = () => {
  return (
    <React.Fragment>
      <InputBox />
      <Pagination />
      <SearchResult />
    </React.Fragment>
  )
}

export default Home;
