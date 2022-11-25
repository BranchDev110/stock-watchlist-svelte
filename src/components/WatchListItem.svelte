<script>
  export let watchlist;
  export let currentWatchList;

  export let handleClick = () => {}
  export let removeItem = () => {}

</script>

<div class={`watch__list__item__container${currentWatchList === watchlist.id ? ' active' : ''}`}>
  <button class="watch__list__item__text" on:click={handleClick}>
    <p>{watchlist.name}</p>
  </button>
  <button class="delete__item" on:click={removeItem}>&#x2715</button>
</div>

<style>
  .active{
    border-bottom: 2px solid #0072E5;
  }
  .active > .watch__list__item__text{
    color: #0072E5;
  }
  button{
    border: none;
    background: none;
    color: #6F7E8C;
    cursor: pointer;
  }
  .delete__item:hover{
    color: #0072E5;
  }
</style>