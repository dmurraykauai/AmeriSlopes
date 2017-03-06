import gql from 'graphql-tag';

export default gql`
  mutation AddMountain($title: String) {
    addMountain(title: $title) {
      title
    }
  }
`;