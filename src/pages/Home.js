import React from 'react';
import { Helmet } from "react-helmet";
import InputBox from '../components/InputBox';
import Pagination from '../components/Pagination';
import SearchResult from '../components/SearchResult';

const Home = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>{'Github User Search'}</title>
        <meta name="description" content={'Search for github users and details'} />
        <meta property="og:title" content={'Github User Search'} />
      </Helmet>
      <InputBox />
      <Pagination />
      <SearchResult />
    </React.Fragment>
  )
}

export default Home;
