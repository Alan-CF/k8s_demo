import { Redirect, Route, Switch } from "wouter";
import Recipes from "./pages/Recipes";
import Recipe from "./pages/Recipe";

function App() {
  return (
    <Switch>
      <Route path="/recipes" component={Recipes} />
      <Route path="/recipes/:id" component={Recipe} />

      <Route path="/">
        <Redirect to="/recipes" />
      </Route>
    </Switch>
  );
}

export default App;
