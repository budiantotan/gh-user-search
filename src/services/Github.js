import fetch from 'isomorphic-unfetch';

const _callAPI = async url => {
  const response = await fetch(url);
  if (response.status === 200) {
    return await response.json();
  }
  throw Error();
}

export const getPopularUsers = () => {
  return _callAPI('https://api.github.com/search/users?q=+repos:%3E42+followers:%3E1000')
}

export const getUser = (username) => {
  return _callAPI(`https://api.github.com/users/${username}`)
}

export const getUserFollower = (username) => {
  return _callAPI(`https://api.github.com/users/${username}/followers`)
}

export const getUserFollowing = (username) => {
  return _callAPI(`https://api.github.com/users/${username}/following`)
}

export const getUserRepo = (username) => {
  return _callAPI(`https://api.github.com/users/${username}/repo`)
}

export const searchUser = (keyword, page) => {
  return _callAPI(`https://api.github.com/search/users?q=${keyword}&page=${page}`)
}
