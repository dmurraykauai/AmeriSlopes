import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {Link, hashHistory} from 'react-router';
import query from '../queries/fetchMountains';
import mutation from '../mutations/AddMountain';

class MountainCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {title: ''};
  }

  onSubmit(event) {
    event.preventDefault();

    //console.log(this.props);

    this.props.mutate({
      variables: {title: this.state.title},
      refetchQueries: [{query}] //Apollo based cold refresh of List
    }).then(() => hashHistory.push('/'));
  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Add a new Mountain Resort</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Resort Name:</label>
          <input
            onChange={event => this.setState({title: event.target.value})}
            value={this.state.title}
          />
        </form>
      </div>
    );
  }
}

export default graphql(mutation)(MountainCreate);
