<script>
  import { Router, Route } from "svelte-navigator";

  import Main from "./Main.svelte";
  import Login from "./components/Login.svelte";
</script>

<Router>
  <Route path="/">
    <Login />
  </Route>
  
  <Route path="main">
    <Main />
  </Route>
</Router>
