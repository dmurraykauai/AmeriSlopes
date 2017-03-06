import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, {createNetworkInterface} from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import {Router, hashHistory, Route, IndexRoute} from 'react-router';

//import './style/style.css';
import App from './components/app';
import LoginForm from './components/Auth/LoginForm';
import SignupForm from './components/Auth/SignupForm';
import MountainCreate from './components/MountainCreate';
import MountainList from './components/MountainList';
import MountainDetail from './components/MountainDetail';
import Dashboard from './components/Dashboard';

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin'
  }
});


const client = new ApolloClient({
  // networkInterface is in charge of making requests to back end server (authentication)
  // delivers set cookies from log in.
  networkInterface,
  // what does this do? ...
  // the "o" is short for object
  // takes every piece of data fetched from Apollo back end and
  // runs it through this function. Whatever is returned from this
  // function is used to identify that piece of data inside of the
  // Apollo client. Uses the 'id' field to identify each record.
  dataIdFromObject: o => o.id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={MountainList} />
          <Route path="login" component={LoginForm} />
          <Route path="signup" component={SignupForm} />
          <Route path="mountains/new" component={MountainCreate} />
          <Route path="mountains/:id" component={MountainDetail} />
          <Route path="dashboard" component={Dashboard} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
