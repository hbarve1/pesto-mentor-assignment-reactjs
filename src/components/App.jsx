import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Search } from "./Search";
import { MarkdownRenderer } from "./MarkdownRenderer/MarkdownRenderer";

import Task_1 from "./MarkdownRenderer/tasks/Task_1.md";
import Task_2 from "./MarkdownRenderer/tasks/Task_2.md";
import Task_3 from "./MarkdownRenderer/tasks/Task_3.md";

export const App = function () {
  return (
    <Router>
      <Switch>
        <Route exact path="/app">
          <Search />
        </Route>
        <Route exact path="/tasks/1">
          <MarkdownRenderer markdown={Task_1} />
        </Route>
        <Route exact path="/tasks/2">
          <MarkdownRenderer markdown={Task_2} />
        </Route>
        <Route exact path="/tasks/3">
          <MarkdownRenderer markdown={Task_3} />
        </Route>
        <Route exact path="/">
          <Redirect to="/tasks/1" />
        </Route>
      </Switch>
    </Router>
  );
};
