import React, {Component} from 'react';
// graphql is a helper to sandwich together a query and React Component
import {graphql} from 'react-apollo';
import {Link} from 'react-router';
import fetchMountain from '../queries/fetchMountain';
import RunCreate from './RunCreate';
import RunList from './RunList';

class MountainDetail extends Component {
  render() {

    //console.log(this.props);
    const {mountain} = this.props.data;

    if(!mountain) {return <div>Loading...</div>;}

    return (
      <div>
        <Link to="/">Back</Link>
        <h3>{mountain.title}</h3>
        <RunList runs={mountain.runs} />
        <RunCreate mountainId={this.props.params.id} />
      </div>
    );
  }
}

export default graphql(fetchMountain, {
  options: (props) => {
    return {variables: {id: props.params.id}}
  }
})(MountainDetail);