import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// importing all the pages
import {
  Bennu,
  Callisto,
  Cancri,
  Eros,
  Europa,
  Ganymede,
  Io,
  Mars,
  Mercury,
  Moon,
  Pluto,
  Rhea,
  Titan,
  Venus,
} from "../Pages/index";

class MyRouts extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/mars" component={Mars} />
            <Route exact path="/moon" component={Moon} />
            <Route exact path="/bennu" component={Bennu} />
            <Route exact path="/callisto" component={Callisto} />
            <Route exact path="/cancri" component={Cancri} />
            <Route exact path="/eros" component={Eros} />
            <Route exact path="/europa" component={Europa} />
            <Route exact path="/ganymede" component={Ganymede} />
            <Route exact path="/io" component={Io} />
            <Route exact path="/mercury" component={Mercury} />
            <Route exact path="/pluto" component={Pluto} />
            <Route exact path="/rhea" component={Rhea} />
            <Route exact path="/titan" component={Titan} />
            <Route exact path="/venus" component={Venus} />
            
          </Switch>
        </Router>
      </div>
    );
  }
}
export default MyRouts;
