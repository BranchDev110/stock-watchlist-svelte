import { writable } from "svelte/store";

import { getStockList, getStockInfo, deleteStock, addStock } from "../services/api";

export const stockStore = writable([]);

export const getStocks = async (watchListId) => {
  if (watchListId !== -1) {
    const result = await getStockList(watchListId);
    if (result.state === "success") {
      try {
        const stocks = await Promise.all(
          result.data.map(async (item) => await getStockInfo(item))
        );
        stockStore.update((stock) => (stock = [...stocks]));
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }
  }
  else{
    resetStockStore();
  }
};

export const removeStockItem = async (stockId) => {
  const result = await deleteStock(stockId);
  if (result.state === "success") {
    stockStore.update((stocks) => stocks = stocks.filter((item) => item.id !== stockId));
  }
};

export const addStockItem = async (watchListId, stockName) => {
  const result = await addStock(watchListId, stockName);
  if(result.state === "success"){
    const newStockInfo = await getStockInfo(result.data);
    stockStore.update((stocks) => stocks = [...stocks, newStockInfo]);
  }
}

export const resetStockStore = () => {
  stockStore.set([]);
}