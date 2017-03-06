import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import mutation from '../mutations/LikeRun';

class RunList extends Component {

  onLike(id, likes) {
    this.props.mutate({
      variables: {id},
      optimisticResponse: {
        __typename: 'Mutation',
        likeRun: {
          id,
          __typename: 'RunType',
          likes: likes + 1
        }
      }
    });
  }

  renderRuns() {
    return this.props.runs.map(({id, content, likes}) => {
      return (
        <li key={id} className="collection-item">
          {content}
          <div className="vote-box">
            <i className="material-icons"
               onClick={() => this.onLike(id, likes)}
            >
              thumb_up</i>
            {likes}
          </div>
        </li>
      );
    });
  }

  render() {
    return (
      <ul className="collection">
        {this.renderRuns()}
      </ul>
    );
  }
}

export default graphql(mutation)(RunList);
