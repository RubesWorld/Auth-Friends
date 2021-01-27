import React from "react";
import "./styles.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

//module imports
import login from "./Components/login";
import PrivateRoute from ".//Components/PrivateRoute";
import FriendsForm from "./Components/FriendsForm";
import axios from "axios";

const url = "http://localhost:5000/api/login";

function App() {
  //* the click handler for the logout.
  const logout = () => {
    axios
      .post(url, {
        headers: {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        },
      })
      .then((res) => {
        localStorage.removeItem("token");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Router>
      <div className="App">
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link onClick={logout}>Logout</Link>
          </li>
        </ul>
        <Switch>
          {/* This will be Private Route in a bit  */}
          {/* <Route exact path="/protected" /> */}
          <PrivateRoute exact path="/FriendsForm" component={FriendsForm} />
          <Route path="/login" component={login} />
          <Route component={login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
