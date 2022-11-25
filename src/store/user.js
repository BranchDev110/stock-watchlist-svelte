import { writable } from 'svelte/store';

import { loginUser } from "../services/api";

const UserStore = writable({});

export const setUser = async (userName) => {
  const result = await loginUser(userName);
  if(result.state === "success"){
    UserStore.update(user => user = result.data);
  }
  else {
    console.log("ERROR", result);
    alert("Network Error");
  }
  return result;
}

export const resetUserStore = () => {
  UserStore.set({});
}

export default UserStore;