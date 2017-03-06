import gql from 'graphql-tag';

export default gql`
  mutation DeleteMountain($id: ID) {
    deleteMountain(id: $id) {
      id
    }
  }
`;