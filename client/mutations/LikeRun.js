import gql from 'graphql-tag';

export default gql`
    mutation LikeRun($id: ID) {
    likeRun(id: $id) {
      id
      likes
    }
  }
`;



