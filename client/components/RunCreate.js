import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import AddRunToMountain from '../mutations/AddRunToMountain';

class RunCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {content: ''};
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.mutate({
      variables: {
        content: this.state.content,
        mountainId: this.props.mountainId
      }
    }).then(() => this.setState({content: ''}));
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <label>Add a Run on this Mountain</label>
        <input
          value={this.state.content}
          onChange={event => this.setState({content: event.target.value})}
        />
      </form>
    );
  }
}

export default graphql(AddRunToMountain)(RunCreate);