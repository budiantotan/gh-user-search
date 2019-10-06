import fetch from 'isomorphic-unfetch';

export const getPopularUsers = async () => {
  const response = await fetch('https://api.github.com/search/users?q=+repos:%3E42+followers:%3E1000')
  return await response.json();
}

export const getUser = async (username) => {
  const response = await fetch(`https://api.github.com/users/${username}`)
  return await response.json();
}

export const searchUser = async keyword => {
  const response = await fetch(`https://api.github.com/search/users?q=${keyword}`)
  return await response.json();
}
