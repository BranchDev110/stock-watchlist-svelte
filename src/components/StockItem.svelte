<script>
  import { removeStockItem } from "../store/stock";

  export let stock = {};

  async function handleDelete(id) {
    removeStockItem(id);
  }
</script>

<tr>
  <td>{stock.symbol}</td>
  <td>{stock.description}</td>
  <td>{stock.iexBidPrice}</td>
  <td>{stock.iexAskPrice}</td>
  <td>{stock.latestPrice}</td>
  <td>
    <button class="btn" on:click={() => handleDelete(stock.id)}>Delete</button>
  </td>
</tr>

<style>
  td {
    text-align: center;
  }

  tr > td {
    padding: 10px 0;
  }

  td > .btn {
    width: 100%;
  }

  tr > td {
    border-bottom: 1px solid gray;
  }
</style>
