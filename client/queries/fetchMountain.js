import gql from 'graphql-tag';

export default gql`
  query MountainQuery($id: ID!) {
    mountain(id: $id) {
      id
      title
      runs {
        id
        content
        likes
      }
    }
  }
`;