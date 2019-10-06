import { useDispatch, useSelector } from 'react-redux';
import { searchUser } from '../services/Github';
import { setSearchResult, setSearchState } from '../redux/actions';

export const useSearchUsers = () => {
  const dispatch = useDispatch();
  const search = async (keyword, page = 1) => {
    try {
      dispatch(setSearchState({ isLoading: true, isError: false }));
      const result = await searchUser(keyword, page);
      dispatch(setSearchResult(result, page));
    } catch (e) {
      dispatch(setSearchState({ isLoading: false, isError: true }));
    }
  }

  return search;
}

