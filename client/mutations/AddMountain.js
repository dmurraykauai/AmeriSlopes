import gql from 'graphql-tag';

const mutation = gql`
  mutation AddMountain($title: String) {
    addMountain(title: $title) {
      title
    }
  }
`;