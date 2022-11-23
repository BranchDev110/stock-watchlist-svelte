<script>
  import { onMount } from 'svelte';
  import WatchListItem from './WatchListItem.svelte';
  import { getWatchList, addWatchList } from './api';

  export let user;

  let watchlistName = "";
  let watchlists = [];
  let stocks = [];

  onMount(async () => {
    const result = await getWatchList(user.id);
    watchlists = [...result.data];
  })

  async function handleAddWatchList() {
    const result = await addWatchList(user.id, watchlistName);
    watchlists = [...watchlists, result.data];
    watchlistName = "";
  }
</script>
<div class="stock__container">
  <div class="stock__header">
    {user.name}
  </div>
  <div class="stock__body">
    <div class="stock__tab__container">
      <div class="stock__tab__header">
        {#each watchlists as watchlist}
          <svelte:component this={WatchListItem} watchlist={watchlist}></svelte:component>
          {:else}
          <p>Loading</p>
        {/each}
        <button on:click={handleAddWatchList}>Add WatchList</button>
        <input type="text" placeholder="WatchList Name" bind:value={watchlistName}/>
      </div>
      <div class="stock__tab__body">
      </div>
    </div>
  </div>
</div>