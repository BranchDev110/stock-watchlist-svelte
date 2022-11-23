import axios from 'axios';

const SERVER_URL = 'http://localhost:8000/';

export const addNewUser = async (username) => {
  const result = await axios.post(`${SERVER_URL}api/user`, {data: username});
  return result;
}

export const getWatchList = async (userid) => {
  const result = await axios.get(`${SERVER_URL}api/watchlist`, {data: userid});
  return result;
}