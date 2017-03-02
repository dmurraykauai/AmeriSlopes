const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const mongoose = require('mongoose');
//noinspection JSUnresolvedFunction
const AuthService = require('../services/auth');

const UserType = require('./types/user_type');
const Mountain = mongoose.model('mountain');
const Run = mongoose.model('run');
const MountainType = require('./types/mountain_type');
const RunType = require('./types/run_type');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return AuthService.signup({ email, password, req });
      }
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        const { user } = req;
        req.logout();
        return user;
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return AuthService.login({ email, password, req });
      }
    },
    addMountain: {
      type: MountainType,
      args: {
        title: {type: GraphQLString}
      },
      resolve(parentValue, {title}) {
        return (new Mountain({title})).save()
      }
    },
    addRunToMountain: {
      type: MountainType,
      args: {
        content: {type: GraphQLString},
        mountainId: {type: GraphQLID}
      },
      resolve(parentValue, {content, mountainId}) {
        return Mountain.addRun(mountainId, content);
      }
    },
    likeRun: {
      type: RunType,
      args: {id: {type: GraphQLID}},
      resolve(parentValue, {id}) {
        return Run.like(id);
      }
    },
    deleteMountain: {
      type: MountainType,
      args: {id: {type: GraphQLID}},
      resolve(parentValue, {id}) {
        return Mountain.remove({_id: id});
      }
    },
    deleteRun: {
      type: RunType,
      args: {id: {type: GraphQLID}},
      resolve(parentValue, {id}) {
        return Run.remove({_id: id});
      }
    }
  }
});

module.exports = mutation;
