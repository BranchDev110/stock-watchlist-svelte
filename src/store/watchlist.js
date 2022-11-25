import { writable } from 'svelte/store';

import { getWatchList, addWatchList, deleteWatchList } from '../services/api';

export const watchListStore = writable([]);
export const currentWatchStore = writable(-1);

export const setCurrentWatchStore = (watchId) => {
  currentWatchStore.update(value => value = watchId);
}

export const setWatchList = async(userId) => {
  const result = await getWatchList(userId);
  if(result.state === "success"){
    watchListStore.update(watchlist => watchlist = [...watchlist, ...result.data])
    currentWatchStore.update(value => value = result.data[0].id);
  } else {
    alert("Error Happened!");
  }
  return result;
}

export const addWatchListItem = async(userId, watchListName) => {
  const result = await addWatchList(userId, watchListName);
  if(result.state === "success") {
    watchListStore.update(watchlist => watchlist = [...watchlist, result.data])
    currentWatchStore.update(value => value = result.data.id);
  } else {
    alert("Error Happened!");   
  }
  return result;
}

export const removeWatchListItem = async(watchListId) => {
  const result = await deleteWatchList(watchListId);
  if (result.state === "success") {
    watchListStore.update(watchlist => {
      const newWatchList = watchlist.filter((item) => item.id !== watchListId);
      currentWatchStore.update(value => value = newWatchList.length !== 0 ? newWatchList[0].id : -1);
      return newWatchList;
    })
  }
}
export const resetWatchListStore = () => {
  watchListStore.set([]);
  currentWatchStore.set(-1);
}