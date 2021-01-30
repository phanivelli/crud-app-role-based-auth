import React from "react";
import "./App.css";
import Login from "./components/Login/login";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import authService from "./services/auth-service";
import AddDepartmentForm from "./components/Pages/addDepartment";
import EditDepartment from "./components/Pages/editDepartment";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/department-list" component={Dashboard} />
          <Route path="/add-department" component={AddDepartmentForm} />
          <Route path="/edit/:id" component={EditDepartment} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
