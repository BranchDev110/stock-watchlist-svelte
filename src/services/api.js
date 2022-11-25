import axios from 'axios';
import { Client } from "@apperate/iexjs";
const client = new Client({ api_token: "pk_d9992b8dadbc471aa5e4935a4ed6a583"});

const SERVER_URL = 'http://localhost:8000/';
export let isLoading = false;

export const loginUser = async (username) => {
  try {
    const result = await axios.post(`${SERVER_URL}api/user`, {data: username});
    return result.data;
  } catch (error) {
    return error;
  }
}

export const getWatchList = async (userid) => {
  try{
    const result = await axios.get(`${SERVER_URL}api/watchlist/${userid}`);
    return result.data;
  } catch (error) {
    return error;
  }
}

export const addWatchList = async (userid, listname) => {
  try {
    const result = await axios.post(`${SERVER_URL}api/watchlist`, {data: {userid: userid, name:listname}});
    return result.data;  
  } catch (error) {
    return error;
  }
}

export const updateWatchList = async (listid, listname) => {
  try {
    const result = await axios.patch(`${SERVER_URL}api/watchlist/${listid}`, {data: listname});
    return result.data; 
  } catch (error) {
    return error; 
  }
}

export const deleteWatchList = async(listid) => {
  try {
    const result = await axios.delete(`${SERVER_URL}api/watchlist/${listid}`);
    return result.data; 
  } catch (error) {
    return error; 
  }
}

export const getStockList = async(listid) => {
  try {
    const result = await axios.get(`${SERVER_URL}api/stock/${listid}`);
    return result.data; 
  } catch (error) {
    return error;
  }
}

export const getStockInfo = async({id, name}) => {
  let result, description;
  try {
    result = await client.quote({ symbol: name });
  } catch (error) {
    console.log(error);
    return null;
  }
  try {
    description = await axios.get(`https://vast.tastyworks.com/symbols/search/${name}`); 
  } catch (error) {
    console.log(error); 
    return null;
  }
  console.log(result);
  return {...result, ...description.data.data.items[0], id};
}

export const addStock = async (listid, symbol) => {
  try {
    const result = await axios.post(`${SERVER_URL}api/stock`, {data: {listid, symbol}});
    return result.data;  
  } catch (error) {
    return error;
  }
}

export const deleteStock = async(stockId) => {
  try {
    const result = await axios.delete(`${SERVER_URL}api/stock/${stockId}`);
    return result.data;  
  } catch (error) {
    return error;
  }
}