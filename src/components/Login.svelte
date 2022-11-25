<script>
  import {useNavigate} from 'svelte-navigator';
  import { setUser } from "../store/user.js";

  let name = "";
  const navigate = useNavigate();

  async function handleSubmit() {
    if ( name !== "") {
      const result = await setUser(name);
      if( result.state === "success" ){
        navigate("/main");
      }
    } else {
      alert("Enter something!");
    }
  }
</script>

<div class="container">
  <div class="userinput_form">
    <p>Stock Watch List</p>
    <input type="text" placeholder="Enter your username" bind:value={name} />
    <button class="btn" on:click={handleSubmit}>O K</button>
  </div>
</div>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .userinput_form {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 500px;
    padding: 20px;
    gap: 10px;
  }
  p {
    padding: 10px 0;
    font-size: 1.25em;
    font-weight: bold;
  }
  input {
    padding: 8px 15px;
    width: 100%;
    outline: none;
    border: none;
    border-bottom: 2px solid gray;
  }
  input:hover{
    border-bottom: 2px solid #1976d2;
  }
</style>