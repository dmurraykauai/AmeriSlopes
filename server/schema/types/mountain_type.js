const mongoose = require('mongoose');
const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList} = graphql;
const RunType = require('./run_type');
const Mountain = mongoose.model('mountain');

const MountainType = new GraphQLObjectType({
  name: 'MountainType',
  fields: () => ({
    id: {type: GraphQLID},
    title: {type: GraphQLString},
    runs: {
      type: new GraphQLList(RunType),
      resolve(parentValue) {
        return Mountain.findRuns(parentValue.id);
      }
    }
  })
});

module.exports = MountainType;


