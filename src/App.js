import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Video from './components/Video';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import './App.css';

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/watch/:videoId" component={Video} />
          <Route path="" component={NotFound} />
        </Switch>
        <Footer />
      </Fragment>
    </Router>
  );
};

export default App;
