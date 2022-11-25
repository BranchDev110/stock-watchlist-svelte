<script>
  import SymbolItem from "./SymbolItem.svelte";

  import {addStockItem} from '../store/stock';

  export let currentWatchList;
  
  let autocomplete_result = [];
  let autoCompleteState = false;

  let searchInput; // use with bind:this to focus element
  let inputValue = "";

  function fetchSymbolsForAutoComplete() {
    if (inputValue.length == 0) {
      autocomplete_result = [];
      return;
    }
    autoCompleteState = true;
    const URL =
      "https://api.tastyworks.com/symbols/search/" + inputValue.toUpperCase();
    return fetch(URL)
      .then((res) => res.json())
      .then((res) => {
        let result = [];
        let items = res.data.items;
        for (let i = 0; i < items.length; i++) {
          result.push(items[i].symbol);
        }
        autocomplete_result = result;
        console.log(autocomplete_result);
      });
  }

  $: if (!inputValue) {
    autocomplete_result = [];
    hiLiteIndex = null;
  }

  const setInputVal = (symbolName) => {
    inputValue = removeBold(symbolName);
    autoCompleteState = false;
    hiLiteIndex = null;
    document.querySelector("#symbol-input").focus();
  };

  const submitValue = async () => {
    if (inputValue && autocomplete_result.indexOf(inputValue) !== -1) {
      addStockItem(currentWatchList, inputValue);
    } else {
      alert("Invalid input!");
    }
  };

  const removeBold = (str) => {
    //replace < and > all characters between
    return str.replace(/<(.)*?>/g, "");
    // return str.replace(/<(strong)>/g, "").replace(/<\/(strong)>/g, "");
  };

  let hiLiteIndex = null;

  const navigateList = (e) => {
    if (
      e.key === "ArrowDown" &&
      hiLiteIndex <= autocomplete_result.length - 1
    ) {
      hiLiteIndex === null ? (hiLiteIndex = 0) : (hiLiteIndex += 1);
    } else if (e.key === "ArrowUp" && hiLiteIndex !== null) {
      hiLiteIndex === 0
        ? (hiLiteIndex = autocomplete_result.length - 1)
        : (hiLiteIndex -= 1);
    } else if (e.key === "Enter") {
      setInputVal(autocomplete_result[hiLiteIndex]);
    } else {
      return;
    }
  };

  function clickOutside(element, callbackFunction) {
    function onClick(event) {
      if (!element.contains(event.target)) {
        callbackFunction();
      }
    }

    document.body.addEventListener("click", onClick);

    return {
      update(newCallbackFunction) {
        callbackFunction = newCallbackFunction;
      },
      destroy() {
        document.body.removeEventListener("click", onClick);
      },
    };
  }
</script>

<svelte:window on:keydown={navigateList} />

<form
  class="autocomplete_form"
  autocomplete="off"
  on:submit|preventDefault={submitValue}
>
  <div class="autocomplete">
    <input
      id="symbol-input"
      type="text"
      placeholder="Search By Symbols"
      bind:this={searchInput}
      bind:value={inputValue}
      on:input={fetchSymbolsForAutoComplete}
    />
    <button class="btn" type="submit">Add</button>
  </div>

  <!-- FILTERED LIST OF COUNTRIES -->
  {#if autoCompleteState === true}
    {#if autocomplete_result.length > 0}
      <ul
        id="autocomplete-items-list"
        use:clickOutside={() => {
          console.log("clicked outside");
          autoCompleteState = false;
        }}
      >
        {#each autocomplete_result as symbol, i}
          <SymbolItem
            itemLabel={symbol}
            highlighted={i === hiLiteIndex}
            on:click={() => setInputVal(symbol)}
          />
        {/each}
      </ul>
    {/if}
  {/if}
</form>

<style>
  .autocomplete {
    display: flex;
    margin-top: 20px;
  }

  .autocomplete input,
  .autocomplete button {
    margin: 0;
  }

  .autocomplete input {
    border: none;
    outline: none;
    border-bottom: 2px solid #6f7e8c;
    padding: 10px 15px;
    width: 300px;
  }

  .autocomplete input:focus {
    border-bottom: 2px solid #1976d2;
  }

  .autocomplete_form {
    position: relative;
  }

  #autocomplete-items-list {
    position: relative;
    left: 0;
    margin: 0;
    padding: 0;
    width: 300px;
    height: 300px;
    overflow-y: auto;
  }
</style>
