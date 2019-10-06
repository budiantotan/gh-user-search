import React from 'react';
import { useSelector } from 'react-redux';
import InputBox from '../components/InputBox';
import PopularUsers from '../components/PopularUsers';
import { getPopularUsers } from '../services/Github';
import { addPopularList } from '../redux/actions';

const Home = () => {
  const popularUsers = useSelector(state => state.popularList);
  return (
    <React.Fragment>
      <InputBox />
      <PopularUsers popularUsers={popularUsers} />
    </React.Fragment>
  )
}

Home.getInitialProps = async ({ store }) => {
  const { popularList } = store.getState();
  if (!(popularList && popularList.items)) {
    try {
      const popularUsers = await getPopularUsers();
      store.dispatch(addPopularList(popularUsers.items))
    } catch (e) {
      console.log(e);
    }
  }
}

export default Home;
