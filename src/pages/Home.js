import React from 'react';
import InputBox from '../components/InputBox';
import PopularUsers from '../components/PopularUsers';
import { getPopularUsers } from '../services/Github';

const Home = (props) => {
  return (
    <React.Fragment>
      <InputBox />
      <PopularUsers popularUsers={props.popularUsers} />
    </React.Fragment>
  )
}

Home.getInitialProps = async () => {
  const popularUsers = await getPopularUsers();
  return { popularUsers };
}

export default Home;
