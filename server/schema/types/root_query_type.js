const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const UserType = require('./user_type');
const MountainType = require('./mountain_type');
const RunType = require('./run_type');
const Run = mongoose.model('run');
const Mountain = mongoose.model('mountain');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    user: {
      type: UserType,
      resolve(parentValue, args, req) {
        return req.user; // returns user if authenticated, otherwise null is returned.
      }
    },
    mountains: {
      type: new GraphQLList(MountainType),
      resolve() {
        return Mountain.find({});
      }
    },
    mountain: {
      type: MountainType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Mountain.findById(id);
      }
    },
    run: {
      type: RunType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parnetValue, { id }) {
        return Run.findById(id);
      }
    }
  })
});

module.exports = RootQuery;
