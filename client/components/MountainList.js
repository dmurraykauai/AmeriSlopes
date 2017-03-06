import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {Link} from 'react-router';
import query from '../queries/fetchMountains';
import mutation from '../mutations/DeleteMountain';

class MountainList extends Component {

  onMountainDelete(id) {
    this.props.mutate({variables: {id}})
      .then(() => this.props.data.refetch()); //refetch will re-run and render w/o the item just deleted
  }

  renderMountains() {
    return this.props.data.mountains.map(({id, title}) => {
      return (
        <li key={id} className="collection-item">
          <Link to={`/mountains/${id}`}>
            {title}
          </Link>
          <i className="material-icons" onClick={() => this.onMountainDelete(id)}>delete</i>
        </li>
      );
    });
  }

  render() {
    //console.log(this.props);
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }
    console.log(this.props.data.user);

    return (
      <div>
        <ul className="collection">
          {this.renderMountains()}
        </ul>
        <Link
          to="/mountains/new"
          className="btn-floating btn-large red right"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

export default graphql(mutation)(
  graphql(query)(MountainList)
);


