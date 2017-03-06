import gql from 'graphql-tag';

export default gql`
  mutation AddRunToMountain($content: String, $mountainId: ID) {
    addRunToMountain(content: $content, mountainId: $mountainId) {
      id
      runs {
        id
        content
        likes
      }
    }
  }
`;