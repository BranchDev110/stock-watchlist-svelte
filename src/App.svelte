<script>
  import { fade } from "svelte/transition";
  import Main from "./Main.svelte";

  let currentState = false;

  function toogleView() {
    currentState = true;
  }
</script>

{#if currentState === false}
  <div class="container">
    <div class="userinput_form">
      <p>Stock Watch List</p>
      <input type="text" placeholder="Enter your username" />
      <button on:click={toogleView}>O K</button>
    </div>
  </div>
{/if}

{#if currentState === true}
	<svelte:component this={Main} answer={110}></svelte:component>
{/if}

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .userinput_form {
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 500px;
    padding: 20px;
    display: flex;
    flex-direction: column;
  }
  p {
    padding: 10px 0;
    font-size: 1.25em;
    font-weight: bold;
  }
  input {
    padding: 8px 15px;
    outline: none;
    border: none;
    border-bottom: 2px solid gray;
  }
  button {
    display: flex;
  }
</style>
