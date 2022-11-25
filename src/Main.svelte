<script>
  import { onMount } from "svelte";
  import { useNavigate } from "svelte-navigator";

  import UserStore, { resetUserStore } from "./store/user";
  import {
    watchListStore,
    currentWatchStore,
    setWatchList,
    addWatchListItem,
    setCurrentWatchStore,
    removeWatchListItem,
    resetWatchListStore,
  } from "./store/watchlist";
  import { stockStore, getStocks, resetStockStore } from "./store/stock";

  import WatchListItem from "./components/WatchListItem.svelte";
  import StockItem from "./components/StockItem.svelte";
  import AutoComplete from "./components/AutoComplete.svelte";

  const navigate = useNavigate();

  let user = {};
  let watchlistName = "";
  let watchlists = [];
  let currentWatchList = undefined;
  let stocks = [];
  let loadingState = false;

  UserStore.subscribe((value) => {
    user = value;
  });
  watchListStore.subscribe((value) => {
    watchlists = [...value];
  });
  currentWatchStore.subscribe((value) => {
    currentWatchList = value;
  });
  stockStore.subscribe((value) => (stocks = [...value]));

  $: currentWatchList && getStocks(currentWatchList);

  onMount(() => {
    if ( user.id ) {
      setWatchList(user.id);
    } else {
      navigate("/");
    }
    setInterval(() => {
      getStocks(currentWatchList);
    }, 5000);
  });

  async function handleAddWatchList() {
    if (watchlistName !== "") {
      addWatchListItem(user.id, watchlistName);
      watchlistName = "";
    } else {
      alert("Enter Something!");
    }
  }

  function removeWatchList(listid) {
    removeWatchListItem(listid);
  }

  function clickWatchList(listid) {
    setCurrentWatchStore(listid);
  }

  function handleLogOut() {
    resetStockStore();
    resetUserStore();
    resetWatchListStore();
    navigate("/");
  }
</script>

<div class="stock__container">
  <div class="stock__header">
    <p class="stock__header__logo">Stock Watch List</p>
    <div class="stock__header__user__control">
      <p class="stock__header__user">{user.name}</p>
      <i class="gg-log-out" on:click={handleLogOut} />
    </div>
  </div>
  <div class="stock__body">
    <div class="stock__tab__container">
      <div class="stock__tab__header">
        <div class="stock__tab__watch__list">
          {#each watchlists as watchlist}
            <svelte:component
              this={WatchListItem}
              handleClick={() => clickWatchList(watchlist.id)}
              {watchlist}
              {currentWatchList}
              removeItem={() => removeWatchList(watchlist.id)}
            />
          {/each}
        </div>
        <div class="add__watchlist__form">
          <input
            class="add__watchlist__input"
            type="text"
            placeholder="WatchList Name"
            bind:value={watchlistName}
          />
          <button class="add__button" on:click={handleAddWatchList}
            ><div class="plus radius" /></button
          >
        </div>
      </div>
      <div class="stock__tab__body">
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Description</th>
              <th>Bid Price</th>
              <th>Ask Price</th>
              <th>Last Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {#each stocks as stock}
              <StockItem {stock} />
            {:else}
              <p>No stocks</p>
            {/each}
          </tbody>
        </table>
        <AutoComplete {currentWatchList} />
      </div>
    </div>
  </div>
</div>

<style>
  .stock__header {
    height: 80px;
    background-color: #1976d2;
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }
  .stock__header__logo,
  .stock__header__user {
    font-size: 1.25rem;
    color: white;
    font-weight: bold;
  }

  .stock__header__user__control {
    display: flex;
  }

  .stock__body {
    padding: 30px 200px;
  }

  .stock__tab__container {
    display: flex;
    flex-direction: column;
  }

  .stock__tab__header {
    display: flex;
    justify-content: space-between;
    height: 50px;
  }

  .stock__tab__watch__list {
    display: flex;
    position: relative;
  }

  .add__watchlist__form {
    display: flex;
    align-items: center;
    position: relative;
  }

  .add__button {
    position: absolute;
    right: 0;
    border: none;
    background: none;
    padding: 0;
    margin: 0;
  }

  .plus {
    --b: 4px; /* the thickness */
    width: 40px; /* the size */
    aspect-ratio: 1;
    border: 10px solid #1976d2; /* the outer space */
    background: conic-gradient(
        from 90deg at var(--b) var(--b),
        #1976d2 90deg,
        #fff 0
      )
      calc(100% + var(--b) / 2) calc(100% + var(--b) / 2) / calc(50% + var(--b))
      calc(50% + var(--b));
    display: inline-block;
    cursor: pointer;
  }

  .radius {
    border-radius: 50%;
  }

  .add__watchlist__input {
    border: none;
    outline: none;
    margin: 0;
    border: 2px solid #6f7e8c;
    border-radius: 5rem;
    height: 42px;
  }

  .add__watchlist__input:focus {
    border-bottom: 2px solid #1976d2;
  }

  .stock__tab__body {
    width: 100%;
    padding: 10px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  tr > th {
    padding: 10px;
    background-color: #1976d2;
    color: white;
  }

  .gg-log-out {
    box-sizing: border-box;
    cursor: pointer;
    width: 6px;
    height: 16px;
    border: 2px solid white;
    transform: scale(var(--ggs, 1));
    border-right: 0;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
    margin-left: -10px;
  }
  .gg-log-out::after,
  .gg-log-out::before {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
  }
  .gg-log-out::after {
    border-top: 2px solid white;
    border-left: 2px solid white;
    transform: rotate(-45deg);
    width: 8px;
    height: 8px;
    left: 4px;
    bottom: 2px;
  }
  .gg-log-out::before {
    border-radius: 3px;
    width: 10px;
    height: 2px;
    background: white;
    left: 5px;
    bottom: 5px;
  }
</style>
