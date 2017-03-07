import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/CurrentUser';
import mutation from '../mutations/Logout';

class Header extends Component {
  onLogoutClick() {
    this.props.mutate({
      refetchQueries: [{ query }] //refresh query to rerender component to show new state.
    });
  }

  renderButtons() {
    const { loading, user } = this.props.data;

    //console.log('user in header: ');
    //console.log(user);

    if (loading) { return <div />; }

    if (user) {
      return (
        <li><a onClick={this.onLogoutClick.bind(this)}>Logout</a></li>
      );
    } else {
      return (
        <div>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </div>
      );
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper blue darken-1">
          <Link to="/" className="brand-logo left">
            Home
          </Link>
          <ul className="right">
            {this.renderButtons()}
          </ul>
        </div>
      </nav>
    );
  }
}

export default graphql(mutation)(
  graphql(query)(Header)
);
